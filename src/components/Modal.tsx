"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

export const categorySchema = z.object({
  name: z.string().nonempty("Category name is required"),
  parent: z.string().optional(),
  description: z.string().optional(),
});

type CategoryFormValues = z.infer<typeof categorySchema>;
type Category = {
    _id: string;
    name: string;
    parent?: string;
    description?: string;
    childCategories?: string[];
  };
type AddCategoryModalProps = {
  onSave: (data: CategoryFormValues) => void;
  categories: Category[];
};

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({ onSave, categories }) => {
  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      parent: "",
      description: "",
    },
  });

  const { control, handleSubmit, reset } = form;

  const onSubmit: SubmitHandler<CategoryFormValues> = async (data) => {
    onSave(data);
    reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full bg-zinc-400 hover:bg-zinc-300 text-md text-white transition-all font-bold">
          Add new category
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Category</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form  className="space-y-4">
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter category name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="parent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Parent Category</FormLabel>
                  <FormControl>
                    <Select
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select parent category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="_">None</SelectItem>
                        {categories.map((category) => (
                          <SelectItem key={category?._id} value={`${category?.parent}/${category?.name}`}>
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
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter description" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="button" onClick={handleSubmit(onSubmit)} className="w-full">
              Save Category
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddCategoryModal;
