"use client"
import { userColumns } from '@/components/DataTableComponents/columns';
import { DataTable } from '@/components/DataTableComponents/data-table';
import React, { useEffect, useState } from 'react';

interface User {
  _id: string;
  name: string;
  mobile: string;
  email: string;
  address: string;
  role: string;
  employeeJoiningDate: Date | undefined;
  salary: string;
  wage_advance: string;
  employee_type: string;
  aadharNumber: string;
  customer_type: string;
  customerJoiningDate: Date;
  vendorJoiningDate: Date;
  individualJoiningDate: Date;
  salesTarget: string;
  shopName: string;
  state: string;
  city: string;
  GST_Number: string;
  products: [];
  // Add other user fields here
}

const ViewUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        const data = await response.json();
        setUsers(data);
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="h-full flex-1 flex-col space-y-2 p-8 md:flex">
      <div className="flex items-center justify-between">
        <p className="text-muted-foreground">
          Here&apos;s a list of your expenses for this month!
        </p>
      </div>
      <DataTable data={users} columns={userColumns} />
    </div>
  );
};

export default ViewUsers;
