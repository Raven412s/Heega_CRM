// app/api/submitForm/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from '../../../lib/mongodb';
import User from '../../../Models/user';
import { parseForm } from '../../../lib/formidable';
import { ensureUploadDir } from '../../../lib/ensureUploadDir';
import formidable from 'formidable';
import path from 'path';

export async function POST(req: NextRequest) {
  try {
    // Ensure the upload directory exists
    ensureUploadDir();

    // Parse the form data and files
    const { fields, files } = await parseForm(req as any);

    // Function to handle file path extraction
    const getFilePath = (file: formidable.File | formidable.File[] | undefined) => {
      if (Array.isArray(file)) {
        return file.length > 0 ? `/uploads/${path.basename(file[0].filepath)}` : undefined;
      }
      return file ? `/uploads/${path.basename(file.filepath)}` : undefined;
    };

    // Extract file paths
    const aadharCardFrontImage = getFilePath(files?.aadharCardFrontImage);
    const aadharCardBackImage = getFilePath(files?.aadharCardBackImage);
    const GST_Image = getFilePath(files?.GST_Image);

    // Connect to the database
    await connectToDatabase();

    // Create a new user
    const newUser = new User({
      ...fields,
      aadharCardFrontImage,
      aadharCardBackImage,
      GST_Image,
    });

    // Save user data to the database
    await newUser.save();
    return NextResponse.json(newUser, { status: 201 });

  } catch (error) {
    // Type guard for error
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json({ error: `Internal Server Error: ${errorMessage}` }, { status: 500 });
  }
}
