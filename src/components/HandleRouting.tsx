"use client";

import { useUser } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AccountsEmployeeSidebar, DefaultSidebar, DistributorSidebar, ManagerSidebar, RetailerSidebar, SuperAdminSidebar, VendorSidebar } from './Sidebar';

const HandleRoutingAndSidebar = () => {
  const { user } = useUser();
  const router = useRouter();
  const [SidebarComponent, setSidebarComponent] = useState(() => DefaultSidebar);

  useEffect(() => {
    // Log the user object for debugging
    console.log("User object in useEffect:", user);

    // Ensure that user is fully populated before proceeding
    if (!user || !user.emailAddresses || user.emailAddresses.length === 0) {
      console.log("User not ready yet.");
      return;
    }
    // Log email to check if it's defined
    console.log("log email from useEffect:", user?.emailAddresses[0].emailAddress);

    const fetchUserAndRedirect = async () => {
      try {
        const email = user?.emailAddresses[0].emailAddress;

        if (!email) {
          console.error('Email is undefined');
          return;
        }

        console.log("Fetching user data for email:", email);
        const response = await fetch('/api/get-user-by-email', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email }),
        });

        if (response.ok) {
          const userData = await response.json();
          console.log("User data fetched:", userData);
          handleRedirectAndSidebar(userData);
        } else {
          console.error('User not found or error fetching user');
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    // Invoke the function
    fetchUserAndRedirect();
  }, [user]);

  const handleRedirectAndSidebar = (userData: { role: string; employee_type: string; customer_type: string }) => {
    const { role, employee_type, customer_type } = userData;

    if (role === 'employee') {
      switch (employee_type) {
        case 'digital media':
          setSidebarComponent(() => VendorSidebar);  // Replace with appropriate sidebar
          router.push('/employees/digital-media/dashboard');
          break;
        case 'packaging':
          setSidebarComponent(() => VendorSidebar);  // Replace with appropriate sidebar
          router.push('/employees/packaging/dashboard');
          break;
        case 'admin':
          setSidebarComponent(() => SuperAdminSidebar); // Replace with appropriate sidebar
          router.push('/employees/admin/dashboard');
          break;
        case 'accounts':
          setSidebarComponent(() => AccountsEmployeeSidebar);  // Replace with appropriate sidebar
          router.push('/employees/accounts/dashboard');
          break;
        case 'workshop':
          setSidebarComponent(() => VendorSidebar);  // Replace with appropriate sidebar
          router.push('/employees/workshop/dashboard');
          break;
        case 'sales':
          setSidebarComponent(() => VendorSidebar);  // Replace with appropriate sidebar
          router.push('/employees/sales/dashboard');
          break;
        default:
          setSidebarComponent(() => VendorSidebar);  // Replace with appropriate sidebar
          router.push('/employees/dashboard');
      }
    } else if(role === 'customer'){
        switch (customer_type) {
            case 'distributor':
              setSidebarComponent(() => DistributorSidebar);  // Replace with appropriate sidebar
              router.push('/customer/distributer/dashboard');
              break;
            case 'retailer':
              setSidebarComponent(() => RetailerSidebar);  // Replace with appropriate sidebar
              router.push('/customer/retailer/dashboard');
              break;
            case 'endUser':
              setSidebarComponent(() => RetailerSidebar);  // Replace with appropriate sidebar
              router.push('/customer/retailer/dashboard');
              break;
            default:
              setSidebarComponent(() => DefaultSidebar);  // Replace with appropriate sidebar
              router.push('/customer/dashboard');
          }
    } else {
      switch (role) {
        case 'ceo':
          setSidebarComponent(() => SuperAdminSidebar);
          router.push('/superAdmin/dashboard');
          break;
        case 'manager':
          setSidebarComponent(() => ManagerSidebar);
          router.push('/manager/dashboard');
          break;
        case 'admin':
          setSidebarComponent(() => SuperAdminSidebar);
          router.push('/admin/dashboard');
          break;
        case 'customer':
          setSidebarComponent(() => VendorSidebar);  // Replace with appropriate sidebar
          router.push('/customer/dashboard');
          break;
        case 'vendor':
          setSidebarComponent(() => VendorSidebar);
          router.push('/vendor/dashboard');
          break;
        default:
          setSidebarComponent(() => DefaultSidebar);
          router.push('/');
      }
    }

    // Set the localStorage flag after routing
    localStorage.setItem('hasRouted', 'true');
  };

  // Render the sidebar along with the children
  return <SidebarComponent />;
};

export default HandleRoutingAndSidebar;
