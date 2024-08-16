"use client";

import EditProductsForm from "@/components/AddProductsFormComponents/EditProductsForm";
import { Product } from "@/components/AddProductsFormComponents/ProductsSchema";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditUser = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState<Product>({
    itemName:"",
    itemCode:"",
    itemHSN:"",
    productUnit:"",
    category:"",
    subCategory:"",
    sizes:"",
    taxSelection:"",
    salePrice:"",
    _createdAt:new Date()
  });

  useEffect(() => {
    const fetchProductData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/get-product?id=${id}`);
          const data = await response.json();


             const convertedData = {
          ...data,
          _createdAt: data?._createdAt ? new Date(data._createdAt) : undefined,
        };

          setFormData(convertedData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchProductData();
  }, [id]);

console.log(formData)
  return (
    <div>
      <h2>Edit Product</h2>
      <div className="flex m-4">
        <EditProductsForm formData={formData} id={id} />
      </div>
    </div>
  );
};

export default EditUser;
