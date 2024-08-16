import { z } from "zod";
export const productFormSchema = z.object({
    itemName: z.string().optional(),
    itemHSN: z.string().optional(),
    productUnit: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    sizes: z.string().optional(),
    itemCode: z.string().optional(),
    salePrice: z.string().optional(),
    taxSelection: z.string().optional(),
    productGST: z.string().optional(),
    _createdAt:z.date().optional(),
  });

  export type Product = z.infer<typeof productFormSchema>;
