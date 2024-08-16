import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function PATCH(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('_id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  const objectId = new ObjectId(id);
  let updatedData = await req.json();
  console.log("updatedData",updatedData)
  // Remove the _id field from the updatedData if it exists
  delete updatedData._id;

  try {
    const client = await clientPromise;
    const db = client.db('heega_CRM');
    const result = await db.collection('products').updateOne({ _id: objectId }, { $set: updatedData });

    if (result.modifiedCount === 1) {
      return NextResponse.json({ message: 'Product updated successfully' }, { status: 200 });
    } else {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
