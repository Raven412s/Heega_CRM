import type { NextApiRequest, NextApiResponse } from 'next';
import nextConnect from 'next-connect';
import multer from 'multer';

// Configure multer to specify upload directory
const upload = multer({ dest: 'uploads/' });

// Create a handler using next-connect
const handler = nextConnect<NextApiRequest, NextApiResponse>({
  onError(err, req, res) {
    console.error(err);
    res.status(500).end('Something went wrong.');
  },
  onNoMatch(req, res) {
    res.status(404).end('Not Found');
  },
});

// Apply middleware for file uploads and define POST request handler
handler.use(upload.any()).post((req, res) => {
  // Log the data sent from the client
  console.log('Body:', req.body);
  console.log('Files:', req.files);

  res.status(200).json({ message: 'Form data received successfully', token: 'dummy-token' });
});

export default handler;
