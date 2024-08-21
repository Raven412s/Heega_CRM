"use client";

import EditUserForm from "@/components/AddUserFormComponents/EditUserForm";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const EditUser = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
const [user, setUser] = useState('')

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
         <div className="flex gap-1"> <strong><span>Mobile No. :</span></strong><span>{user.mobile}</span></div>
         <div className="flex gap-1">
            <strong><span>Email :</span></strong><span>{user.email}</span>
         </div>
         <div className="flex gap-1">
            <strong><span>Job Role :</span></strong><span>{user.role}</span>
         </div>
      </div>
    </div>
  );
};

export default EditUser;
