"use client";
import AddCategoryModal, { categorySchema } from "@/components/Modal";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import {
    Controller,
    SubmitHandler,
    useForm
} from "react-hook-form";
import { z } from "zod";
import { productFormSchema } from "./ProductsSchema";

type ProductFormValues = z.infer<typeof productFormSchema>;
interface EditProductFormProps {
    formData: ProductFormValues;
      id: string | null
  }

const EditProductsForm: React.FC<EditProductFormProps> = ({ formData, id }) =>{
    const form = useForm<ProductFormValues>({
        resolver: zodResolver(productFormSchema),
        defaultValues: formData
      });
      const { control, handleSubmit, watch,reset, formState } = form;
      const router = useRouter()
      const taxType = watch("taxSelection")

      type Category = {
        _id: string;
        name: string;
        parent?: string;
        description?: string;
      };
      console.log(formState.errors)
      const [categories, setCategories] = useState<Category[]>([]); // State to store categories
      useEffect(() => {
        // Fetch categories from the database
       const fetchCategories = async()=>{
       await fetch("/api/categories")
        .then((response) => response.json())
        .then((data) => {setCategories(data)})
        .catch((error) => console.error("Error fetching categories:", error));
       }
       fetchCategories()
      }, [setCategories]);

      useEffect(() => {
        // Reset the form with the fetched data when formData changes
        reset(formData);
      }, [formData, reset]);
      type CategoryFormValues = z.infer<typeof categorySchema>;

      const handleSaveCategory = async (data: CategoryFormValues) => {
        try {
          const response = await fetch('/api/create-category', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });

          if (!response.ok) {
            throw new Error('Failed to create category');
          }

          const newCategory = await response.json();
          setCategories((prev) => [...prev, newCategory.name]); // Update category list

        } catch (error) {
          console.error('Error creating category:', error);
        }
      };

      const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
        try {
            const convertedData = {
                ...data,
                _createdAt: data?._createdAt ? new Date(data._createdAt) : undefined,
              };
          const response = await fetch(`/api/update-product?_id=${id}`, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(convertedData),
          });

          if (!response.ok) {
            throw new Error('Failed to submit form');
          }

          const result = await response.json();
          console.log(result)
          form.reset();
          router.push("/superAdmin/products/view")
          // Optionally, handle success (e.g., show a success message, reset the form, etc.)
        } catch (error) {
          console.error('Error submitting form:', error);
          // Optionally, handle error (e.g., show an error message)
        }
      };
  return (
    <Form {...form}>
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    <div className="flex-col gap-4 bg-secondary p-4 min-w-[300px]">
          <div className="flex flex-col w-full">
            <div className="flex gap-4 py-2 px-4 items-center">
            <FormField
              control={control}
              name="itemName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Product Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="itemHSN"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product HSN</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter HSN Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
                control={control}
                      name={`productUnit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Measuring Unit</FormLabel>
                          <FormControl>
                            <Controller
                              name={`productUnit`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={(value) => {
                                    field.onChange(value); // Update form state
                                  }}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="meter">meter</SelectItem>
                                    <SelectItem value="kilogram">kilogram</SelectItem>
                                    <SelectItem value="piece">piece</SelectItem>
                                    <SelectItem value="liter">liter</SelectItem>
                                    <SelectItem value="gram">gram</SelectItem>
                                    <SelectItem value="foot">foot</SelectItem>
                                    <SelectItem value="pack">pack</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
              )}
            />
            </div>
            <div className="flex gap-4 py-2 px-4 items-center">
            <FormField
        control={control}
        name="category"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <FormControl>
              <Select
                value={field.value}
                onValueChange={(value) => field.onChange(value)}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                <AddCategoryModal onSave={handleSaveCategory} categories={categories} />
                {categories.map((category) => (
                    <SelectItem key={category?._id} value={category?.name}>
                      {category?.parent}/{category?.name}
                    </SelectItem>
                  ))}

                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

            <FormField
              control={control}
              name="itemCode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Code</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Item Code" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            </div>
            <div className="flex gap-4 py-2 px-4 items-center">
            <FormField
              control={control}
              name="salePrice"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Sale Price</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Sale Price" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
               control={control}
                      name={`taxSelection`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Tax Selection</FormLabel>
                          <FormControl>
                            <Controller
                              name={`taxSelection`}
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={(value) => {
                                    field.onChange(value); // Update form state
                                  }}
                                >
                                  <SelectTrigger className="w-[180px]">
                                    <SelectValue placeholder="Select Type" />
                                  </SelectTrigger>
                                  <SelectContent>
                                  <SelectItem value="withTax">With Tax</SelectItem>
                                  <SelectItem value="withoutTax">Without Tax</SelectItem>
                                  </SelectContent>
                                </Select>
                              )}
                            />

                          </FormControl>
                          <FormMessage />
                        </FormItem>
              )}
            />
            {
                taxType === "withTax" && <FormField
                control={control}
                       name={`productGST`}
                       render={({ field }) => (
                         <FormItem>
                           <FormLabel>GST CATEGORY</FormLabel>
                           <FormControl>
                             <Controller
                               name={`productGST`}
                               control={control}
                               render={({ field }) => (
                                 <Select
                                   value={field.value}
                                   onValueChange={(value) => {
                                     field.onChange(value); // Update form state
                                   }}
                                 >
                                   <SelectTrigger className="w-[180px]">
                                     <SelectValue placeholder="Select GST%" />
                                   </SelectTrigger>
                                   <SelectContent>
                                     <SelectItem value="5% GST">5% GST</SelectItem>
                                     <SelectItem value="5% IGST">5% IGST</SelectItem>
                                     <SelectItem value="12% GST">12% GST</SelectItem>
                                     <SelectItem value="12% IGST">12% IGST</SelectItem>
                                     <SelectItem value="18% GST">18% GST</SelectItem>
                                     <SelectItem value="18% IGST">18% IGST</SelectItem>
                                   </SelectContent>
                                 </Select>
                               )}
                             />
                           </FormControl>
                           <FormMessage />
                         </FormItem>
                )}
             />
            }

            </div>

            </div>
            </div>
      <Button type="submit">Submit</Button>
    </form>
  </Form>
  )
}

export default EditProductsForm
