"use client"
import { useEffect } from 'react';
import {  useClerk } from '@clerk/nextjs';

const ClearRoutingFlagOnLogout = () => {
  const { addListener } = useClerk();

  useEffect(() => {
    const clearFlagOnSignOut = () => {
      localStorage.removeItem('hasRouted');
    };

    // Add event listener for sign-out
    const unsubscribe = addListener('signOut', clearFlagOnSignOut);

    // Cleanup listener on component unmount
    return () => {
      unsubscribe();
    };
  }, [addListener]);

  return null;
};

export default ClearRoutingFlagOnLogout;
