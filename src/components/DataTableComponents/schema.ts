import { z } from "zod";

// We're keeping a simple non-relational schema here.
// IRL, you will have a schema for your data models.
export const formSchema = z.object({
    name: z.string().optional(),
    mobile: z.string().optional(),
    email: z.string().email().optional(),
    address: z.string().optional(),
    role: z.string().optional(),
    employeeJoiningDate:z.date().optional(),
    salary: z.string().optional(),
    wage_advance: z.string().optional(),
    employee_type: z.string().optional(),
    aadharNumber: z.string().optional(),
    customer_type: z.string().optional(),
    vendorJoiningDate: z.date().optional(),
    customerJoiningDate: z.date().optional(),
    individualJoiningDate: z.date().optional(),
    salesTarget: z.string().optional(),
    shopName: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    GST_Number: z.string().optional(),
    PAN_Number: z.string().optional(),
    bankAccountNumber: z.string().optional(),
    aadharCardFront: z.instanceof(File).optional(),
    aadharCardBack: z.instanceof(File).optional(),
    gstDocument: z.instanceof(File).optional(),
    products: z
      .array(
        z.object({
          productName: z.string().optional(),
          productRate: z.string().optional(),
          productUnit: z.string().optional(),
        })
      )
      .optional(),
      _createdAt:  z.date(),
  });

export type User = z.infer<typeof formSchema>;
