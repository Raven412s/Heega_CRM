"use client";

import EditUserForm from "@/components/AddUserFormComponents/EditUserForm";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import {User as FormValues} from "@/components/DataTableComponents/schema"

const EditUser = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");

  const [formData, setFormData] = useState<FormValues>({
    name: "",
    mobile: "",
    email: "",
    address: "",
    role: "",
    employeeJoiningDate:  new Date(),
    salary: "",
    wage_advance: "",
    employee_type: "",
    aadharNumber: "",
    customer_type: "",
    customerJoiningDate: new Date(),
    vendorJoiningDate: new Date(),
    individualJoiningDate: new Date(),
    _createdAt: new Date(),
    salesTarget: "",
    shopName: "",
    state: "",
    city: "",
    GST_Number: "",
    products: [],
  });

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/get-user?id=${id}`);
          const data = await response.json();
          const convertedData = {
            ...data,
            vendorJoiningDate: data.vendorJoiningDate ? new Date(data.vendorJoiningDate) : undefined,
            customerJoiningDate: data.customerJoiningDate ? new Date(data.customerJoiningDate) : undefined,
            individualJoiningDate: data.individualJoiningDate ? new Date(data.individualJoiningDate) : undefined,
            _createdAt: data._createdAt ? new Date(data._createdAt) : undefined,
          };

          setFormData(convertedData);
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, [id]);

console.log(formData)
  return (
    <div>
      <h2>Edit User</h2>
      <div className="flex m-4">
        <EditUserForm formData={formData} id={id} />
      </div>
    </div>
  );
};

export default EditUser;
