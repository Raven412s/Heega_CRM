import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function DELETE(req: NextRequest) {
  try {
    // Parse the query parameters to get the _id
    const { searchParams } = new URL(req.url);
    const _id = searchParams.get('_id');

    if (!_id) {
      return NextResponse.json({ message: 'ID is required' }, { status: 400 });
    }

    // Convert the id string to an ObjectId
    const objectId = new ObjectId(_id);

    // Connect to the MongoDB client and access the database and collection
    const client = await clientPromise;
    const db = client.db('heega_CRM');
    const collection = db.collection('products');

    // Delete the document with the specified _id
    const result = await collection.deleteOne({ _id: objectId });

    if (result.deletedCount === 1) {
      return NextResponse.json({ message: 'Document deleted successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Document not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to delete document:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
