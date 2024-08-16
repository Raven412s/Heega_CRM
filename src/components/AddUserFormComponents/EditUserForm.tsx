import React, { useEffect, useState } from "react";
import { useForm, SubmitHandler, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Select, SelectValue,SelectTrigger, SelectContent, SelectItem } from "../ui/select";
import EmployeeFormSection from "./EmployeeSectionForm";
import CustomerNotEndUserFormSection from "./CustomerNotEndUserFormSection";
import CustomerEndUserFormSection from "./CustomerEndUserFormSection";
import VendorFormSection from "./VendorFormSection";
import { Button } from "../ui/button";

// Define the form schema using Zod
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
    bankAccountNumber: z.string().optional(),
    PAN_Number: z.string().optional(),
    customer_type: z.string().optional(),
    vendorJoiningDate: z.date().optional(),
    customerJoiningDate: z.date().optional(),
    individualJoiningDate: z.date().optional(),
    salesTarget: z.string().optional(),
    shopName: z.string().optional(),
    state: z.string().optional(),
    city: z.string().optional(),
    distributorPrice: z.string().optional(),
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
          productHSN: z.string().optional(),
          productGST: z.string().optional(),
        })
      )
      .optional(),
  });
type FormValues = z.infer<typeof formSchema>;

interface EditUserFormProps {
  formData: FormValues;
    id: string | null
}

const EditUserForm: React.FC<EditUserFormProps> = ({ formData, id }) => {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: formData,
  });
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [customerJoiningDate, setCustomerJoiningDate] = useState<Date | undefined>(new Date());
  const [vendorJoiningDate, setVendorJoiningDate] = useState<Date | undefined>(new Date());
  const [role, setRole] = useState("");
  const [customerType, setCustomerType] = useState("");
  const { control, handleSubmit, watch, reset,formState } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "products",
  });
const router=useRouter()
  useEffect(() => {
    reset(formData);
  }, [formData, reset]);

  console.log("formState.errors :", formState.errors)

  const handleUpdate: SubmitHandler<FormValues> = async (data) => {
        console.log(data)



    try {
        console.log("convertedData :",data)
        const convertedData = {
            ...data,
            employeeJoiningDate: new Date(data?.employeeJoiningDate),
          };
             const response = await fetch(`/api/update-user?_id=${id}`, {
               method: "PATCH",
               headers: {
                 "Content-Type": "application/json",
               },
               body: JSON.stringify(convertedData),
             });


      if (response.ok) {
        console.log("User updated successfully");
        router.push("/superAdmin/users/view")
      } else {
        console.error("Failed to update user");
      }
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };


  return (
    <Form {...form}>
      <form onSubmit={(e) => {

          handleSubmit((data) => {
    handleUpdate(data);
  })(e);
}} className="space-y-8">
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

          {(role === "employee" || role === "manager" )&& (
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
                      <FormField
                      control={control}
                      name={`products[${index}].productHSN`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Product HSN</FormLabel>
                          <FormControl>
                            <Input placeholder="Enter Product HSN" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                       <FormField
                      control={control}
                      name={`products[${index}].productGST`}
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>GST CATEGORY</FormLabel>
                          <FormControl>
                            <Controller
                              name={`products[${index}].productGST`}
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
                        productHSN:"",
                        productGST:"",
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

export default EditUserForm;
