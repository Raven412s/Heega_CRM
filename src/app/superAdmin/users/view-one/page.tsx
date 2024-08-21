"use client";

import { formSchema } from "@/components/AddUserFormComponents/AddUserForm";
import EditUserForm from "@/components/AddUserFormComponents/EditUserForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { z } from "zod";

const ViewOneUser = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  type FormValues = z.infer<typeof formSchema>;
const [user, setUser] = useState<FormValues>({})

  useEffect(() => {
    const fetchUserData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/get-user?id=${id}`);
          const data = await response.json();
            setUser(data)
        } catch (error) {
          console.error("Failed to fetch user data:", error);
        }
      }
    };

    fetchUserData();
  }, [id]);


  return (
    <div>
      <h2>User Details</h2>
      <div className="flex flex-col m-4">
         <div className="flex gap-1">
         <strong><span>Name :</span></strong><span>{user.name}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Mobile No. :</span></strong><span>{user.mobile}</span>
        </div>
         <div className="flex gap-1">
            <strong><span>Email :</span></strong><span>{user.email}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Job Role :</span></strong><span>{user.role}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Address :</span></strong><span>{user.address}</span>
         </div>
         {/* employee */}
         {
            user.role === "employee" && (
                <div className="flex flex-col">
         <div className="flex gap-1">
         <strong><span>Employee Joining Date :</span></strong><span>{user.employeeJoiningDate?.toString()}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Salary :</span></strong><span>{user.salary}</span>
        </div>
         <div className="flex gap-1">
            <strong><span>Wage / Advance :</span></strong><span>{user.wage_advance}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Employee Type :</span></strong><span>{user.employee_type}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Aadhar Number :</span></strong><span>{user.aadharNumber}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Pan Number :</span></strong><span>{user.PAN_Number}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Bank Account Number :</span></strong><span>{user.bankAccountNumber}</span>
         </div>
         </div>
            )
         }

         {/* custumer */}
         {
            user.role === "customer" && (
                <div className="flex flex-col">
                <div className="flex gap-1">
                <strong><span>Customer Joining Date :</span></strong><span>{user.customerJoiningDate?.toString()}</span>
                </div>
                <div className="flex gap-1">
                   <strong><span>Sales Target :</span></strong><span>{user.salesTarget}</span>
               </div>
                <div className="flex gap-1">
                   <strong><span>Shop Name :</span></strong><span>{user.shopName}</span>
                </div>
                <div className="flex gap-1">
                   <strong><span>Customer Type :</span></strong><span>{user.customer_type}</span>
                </div>
                <div className="flex gap-1">
                   <strong><span>GST Number :</span></strong><span>{user.GST_Number}</span>
                </div>
                <div className="flex gap-1">
                   <strong><span>State :</span></strong><span>{user.state}</span>
                </div>
                <div className="flex gap-1">
                   <strong><span>City :</span></strong><span>{user.city}</span>
                </div>
                </div>
            )
         }

      </div>
    </div>
  );
};

export default ViewOneUser;
