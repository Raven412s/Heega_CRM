import { NextApiRequest, NextApiResponse } from 'next';
import formidable from 'formidable';
import fs from 'fs';
import { v2 as cloudinary } from 'cloudinary';
import clientPromise from '@/lib/mongodb'; // Adjust the import based on your project structure

export const config = {
  api: {
    bodyParser: false,
  },
};

// Define the type for Cloudinary upload result
interface CloudinaryUploadResult {
  secure_url: string;
}

// Cloudinary upload function
const uploadToCloudinary = async (filePath: string): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(filePath, (error, result) => {
      if (error) return reject(error);
      if (result) resolve(result as CloudinaryUploadResult);
      else reject(new Error('Upload result is undefined'));
    });
  });
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      // Parse form data
      const form = new formidable.IncomingForm();

      form.parse(req, async (err, fields, files) => {
        if (err) return res.status(500).json({ error: 'Error parsing form' });

        // Ensure files.file is defined and handle it
        const file = files.file instanceof Array ? files.file[0] : files.file;
        if (!file || !(file as formidable.File).filepath) return res.status(400).json({ error: 'No file uploaded' });

        const filePath = (file as formidable.File).filepath;

        // Upload to Cloudinary
        const result = await uploadToCloudinary(filePath);

        // Save the image URL to MongoDB
        const client = await clientPromise;
        const db = client.db('yourDatabaseName'); // Replace with your database name
        const collection = db.collection('images');
        await collection.insertOne({ url: result.secure_url });

        // Clean up temporary file
        fs.unlinkSync(filePath);

        res.status(200).json({ url: result.secure_url });
      });
    } catch (error) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
};

// Named export for POST method
export const POST = handler;
