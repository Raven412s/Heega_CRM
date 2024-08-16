// app/api/submit-form/route.ts
import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(req: NextRequest) {
  try {
    const client = await clientPromise;
    const db = client.db(); // Connect to the default database specified in the URI
    const collection = db.collection('products'); // Specify the collection

    const data = await req.json();

    const result = await collection.insertOne(data);

    return NextResponse.json({ message: 'Product added successfully', result }, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: 'Failed to add product', error }, { status: 500 });
  }
}
