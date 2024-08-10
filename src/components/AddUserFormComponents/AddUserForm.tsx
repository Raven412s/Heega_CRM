"use client";
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
import React, { useState } from "react";
import {
    Controller,
    SubmitHandler,
    useFieldArray,
    useForm,
} from "react-hook-form";
import { z } from "zod";
import CustomerEndUserFormSection from "./CustomerEndUserFormSection";
import CustomerNotEndUserFormSection from "./CustomerNotEndUserFormSection";
import EmployeeFormSection from "./EmployeeSectionForm";
import { Textarea } from "../ui/textarea";
import VendorFormSection from "./VendorFormSection";

export const formSchema = z.object({
  name: z.string().optional(),
  mobile: z.string().optional(),
  email: z.string().email().optional(),
  address: z.string().optional(),
  role: z.string().optional(),
  employeeJoiningDate: z.date().optional(),
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
  aadharCardFront: z.instanceof(File).optional(),
  aadharCardBack: z.instanceof(File).optional(),
  gstDocument: z.instanceof(File).optional(),
  _createdAt:z.date(),
  products: z
    .array(
      z.object({
        productName: z.string().optional(),
        productRate: z.string().optional(),
        productUnit: z.string().optional(),
      })
    )
    .optional(),
});

type FormValues = z.infer<typeof formSchema>;

const AddUserForm: React.FC = () => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      mobile: "",
      email: "",
      address: "",
      role: "",
      employeeJoiningDate: undefined,
      salary: "",
      wage_advance: "",
      employee_type: "",
      aadharNumber: "",
      customer_type: "",
      customerJoiningDate: new Date(),
      vendorJoiningDate: new Date(),
      individualJoiningDate: new Date(),
      _createdAt:new Date(),
      salesTarget: "",
      shopName: "",
      state: "",
      city: "",
      GST_Number: "",
      products: [],
    },
  });

  const [date, setDate] = useState<Date | undefined>(undefined);
  const [customerJoiningDate, setCustomerJoiningDate] = useState<Date | undefined>(new Date());
  const [vendorJoiningDate, setVendorJoiningDate] = useState<Date | undefined>(new Date());
  const [role, setRole] = useState("");
  const [customerType, setCustomerType] = useState("");
  const { control, handleSubmit, watch } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();
      console.log(result)
      form.reset();
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
            <FormField
              control={control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="mobile"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Mobile</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Mobile Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Your Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter Your Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex gap-4">
              <FormField
                control={control}
                name="role"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Assign Role</FormLabel>
                    <FormControl>
                      <Controller
                        name="role"
                        control={control}
                        render={({ field }) => (
                          <Select
                            value={field.value}
                            onValueChange={(value) => {
                              field.onChange(value); // Update form state
                              setRole(value); // Update local state
                            }}
                          >
                            <SelectTrigger className="w-[180px]">
                              <SelectValue placeholder="Select" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="ceo">CEO</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="employee">Employee</SelectItem>
                              <SelectItem value="customer">Customer</SelectItem>
                              <SelectItem value="vendor">Vendor</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {role === "customer" && (
                <FormField
                  control={control}
                  name="customer_type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Customer Type</FormLabel>
                      <FormControl>
                        <Controller
                          name="customer_type"
                          control={control}
                          render={({ field }) => (
                            <Select
                              value={field.value}
                              onValueChange={(value) => {
                                field.onChange(value); // Update form state
                                setCustomerType(value); // Update local state
                              }}
                            >
                              <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="distributer">Distributer</SelectItem>
                                <SelectItem value="retailer">Retailer</SelectItem>
                                <SelectItem value="end_user">End User</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </div>
          </div>

          {(role === "employee" || role === "manager") && (
            <EmployeeFormSection
              control={control}
              setDate={setDate}
              date={date}
              form={form}
            />
          )}
          {role === "customer" && (
            <>
              {(customerType === "retailer" || customerType === "distributer") && (
                <CustomerNotEndUserFormSection
                  control={control}
                  customerJoiningDate={customerJoiningDate}
                  setCustomerJoiningDate={setCustomerJoiningDate}
                />
              )}
              {customerType === "end_user" && (
                <CustomerEndUserFormSection control={control} />
              )}
            </>
          )}
          {role === "vendor" && (
            <VendorFormSection
              control={control}
              vendorJoiningDate={vendorJoiningDate}
              setVendorJoiningDate={setVendorJoiningDate}
            />
          )}
          {role === "vendor" && (
            <>
              {/* Products Section */}
              <div className="mt-4">
                <h3>Products</h3>
                {fields.map((item, index) => (
                  <div
                    key={item.id}
                    className="flex gap-4 justify-evenly items-end my-2"
                  >
                    <FormField
                      control={control}
                      name={`products[${index}].productName`}
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
                      name={`products[${index}].productRate`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product Rate</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter Product Rate"
                              type="number"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={control}
                      name={`products[${index}].productUnit`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Measuring Unit</FormLabel>
                          <FormControl>
                            <Controller
                              name={`products[${index}].productUnit`}
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
                    <Button type="button" onClick={() => remove(index)}>
                      Remove Product
                    </Button>
                  </div>
                ))}

                <div className="my-4">
                  <Button
                    type="button"
                    onClick={() =>
                      append({
                        productName: "",
                        productRate: "",
                        productUnit: "",
                      })
                    }
                  >
                    Add New Product
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default AddUserForm;
