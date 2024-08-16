import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');

  if (!id) {
    return NextResponse.json({ message: 'ID is required' }, { status: 400 });
  }

  const objectId = new ObjectId(id);

  try {
    const client = await clientPromise;
    const db = client.db('heega_CRM');
    const user = await db.collection('products').findOne({ _id: objectId });
    if (!user) {
      return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    return NextResponse.json(user, { status: 200 });
  } catch (error) {
    console.error('Error fetching product:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}
