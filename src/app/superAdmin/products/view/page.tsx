"use client"
import { productColumns } from '@/components/DataTableComponents/columns';
import { DataTableForProducts } from '@/components/DataTableComponents/data-table';
import React, { useEffect, useState } from 'react';

interface Product {
    itemName:"",
    itemCode:"",
    itemHSN:"",
    productUnit:"",
    category:"",
    subCategory:"",
    sizes:"",
    taxSelection:"",
    salePrice:"",
    _createdAt:Date
}

const ViewUsers: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError('Failed to fetch products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses for this month!
        </p>
      </div>
      <DataTableForProducts data={products} columns={productColumns} />
    </div>
  );
};

export default ViewUsers;
