"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList
} from "@/components/ui/command";
import { LayoutDashboard, User2, UserPlus2 } from 'lucide-react';
import { FaClipboardList } from "react-icons/fa";
import Link from 'next/link';
import { BiCartAdd } from "react-icons/bi";

export function SuperAdminSidebar() {
  return (
    <>
         <Command className='bg-secondary left-0  w-[300px] focus:outline-none max-h-[100vh] rounded-none'>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="SuperAdmin Dashboard">
                <Link href="/superAdmin/dashboard">
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <span>Dashboard</span>
              </CommandItem>
                </Link>
              <Accordion type="single" collapsible>
                 <AccordionItem value="item-1">
                   <AccordionTrigger className='text-sm mx-4'>User Management</AccordionTrigger>
                    <AccordionContent>
                        <Link href="/superAdmin/users/add">
                            <CommandItem className='flex  items-center'>
                                <UserPlus2 className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">Add New User</h3>
                            </CommandItem>
                        </Link>
                        <Link href="/superAdmin/users/view">
                            <CommandItem className='flex  items-center'>
                                <User2 className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">View All Users</h3>
                            </CommandItem>
                        </Link>

                    </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-2">
                   <AccordionTrigger className='text-sm mx-4'>Product Management</AccordionTrigger>
                    <AccordionContent>
                        <Link href="/superAdmin/products/add">
                            <CommandItem className='flex  items-center'>
                                <BiCartAdd className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">Add New Product</h3>
                            </CommandItem>
                        </Link>
                        <Link href="/superAdmin/products/view">
                            <CommandItem className='flex  items-center'>
                                <FaClipboardList className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">Product List</h3>
                            </CommandItem>
                        </Link>

                    </AccordionContent>
                 </AccordionItem>
               </Accordion>

            </CommandGroup>
          </CommandList>
        </Command>

    </>
  )
}

export function ManagerSidebar() {
  return (
    <>
         <Command className='bg-secondary left-0  w-[300px] focus:outline-none max-h-[100vh] rounded-none'>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="SuperAdmin Dashboard">
                <Link href="/superAdmin/dashboard">
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <span>Dashboard</span>
              </CommandItem>
                </Link>
              <Accordion type="single" collapsible>
                 <AccordionItem value="item-1">
                   <AccordionTrigger className='text-sm mx-4'>User Management</AccordionTrigger>
                    <AccordionContent>
                        <Link href="/superAdmin/users/add">
                            <CommandItem className='flex  items-center'>
                                <UserPlus2 className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">Add New User</h3>
                            </CommandItem>
                        </Link>
                        <Link href="/superAdmin/users/view">
                            <CommandItem className='flex  items-center'>
                                <User2 className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">View All Users</h3>
                            </CommandItem>
                        </Link>

                    </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-2">
                   <AccordionTrigger className='text-sm mx-4'>Product Management</AccordionTrigger>
                    <AccordionContent>
                        <Link href="/superAdmin/products/add">
                            <CommandItem className='flex  items-center'>
                                <BiCartAdd className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">Add New Product</h3>
                            </CommandItem>
                        </Link>
                        <Link href="/superAdmin/products/view">
                            <CommandItem className='flex  items-center'>
                                <FaClipboardList className='mr-2 h-4 w-4' />
                                <h3 className="cursor-pointer">Product List</h3>
                            </CommandItem>
                        </Link>

                    </AccordionContent>
                 </AccordionItem>
               </Accordion>

            </CommandGroup>
          </CommandList>
        </Command>

    </>
  )
}

export function VendorSidebar() {
  return (
    <>
         <Command className='bg-secondary left-0  w-[300px] focus:outline-none max-h-[100vh] rounded-none'>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Vendor Dashboard">
                <Link href="/vendor/dashboard">
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <span>Dashboard</span>
              </CommandItem>
                </Link>
            </CommandGroup>
          </CommandList>
        </Command>
    </>
  )
}

export function DefaultSidebar() {
  return (
    <>
         <Command className='bg-secondary left-0  w-[300px] focus:outline-none max-h-[100vh] rounded-none'>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Default Dashboard">
                <Link href="/default/dashboard">
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <span>Dashboard</span>
              </CommandItem>
                </Link>
            </CommandGroup>
          </CommandList>
        </Command>
    </>
  )
}

export function AccountsEmployeeSidebar() {
    return (
      <>
           <Command className='bg-secondary left-0  w-[300px] focus:outline-none max-h-[100vh] rounded-none'>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="SuperAdmin Dashboard">
                  <Link href="/superAdmin/dashboard">
                <CommandItem>
                  <LayoutDashboard className='mr-2 h-4 w-4' />
                  <span>Dashboard</span>
                </CommandItem>
                  </Link>
                <Accordion type="single" collapsible>
                   <AccordionItem value="item-1">
                     <AccordionTrigger className='text-sm mx-4'>User Management</AccordionTrigger>
                      <AccordionContent>
                          <Link href="/superAdmin/users/add">
                              <CommandItem className='flex  items-center'>
                                  <UserPlus2 className='mr-2 h-4 w-4' />
                                  <h3 className="cursor-pointer">Add New User</h3>
                              </CommandItem>
                          </Link>
                          <Link href="/superAdmin/users/view">
                              <CommandItem className='flex  items-center'>
                                  <User2 className='mr-2 h-4 w-4' />
                                  <h3 className="cursor-pointer">View All Users</h3>
                              </CommandItem>
                          </Link>

                      </AccordionContent>
                   </AccordionItem>
                   <AccordionItem value="item-2">
                     <AccordionTrigger className='text-sm mx-4'>Product Management</AccordionTrigger>
                      <AccordionContent>
                          <Link href="/superAdmin/products/add">
                              <CommandItem className='flex  items-center'>
                                  <BiCartAdd className='mr-2 h-4 w-4' />
                                  <h3 className="cursor-pointer">Add New Product</h3>
                              </CommandItem>
                          </Link>
                          <Link href="/superAdmin/products/view">
                              <CommandItem className='flex  items-center'>
                                  <FaClipboardList className='mr-2 h-4 w-4' />
                                  <h3 className="cursor-pointer">Product List</h3>
                              </CommandItem>
                          </Link>

                      </AccordionContent>
                   </AccordionItem>
                 </Accordion>

              </CommandGroup>
            </CommandList>
          </Command>

      </>
    )
}

export function DistributorSidebar() {
    return (
      <>
           <Command className='bg-secondary left-0  w-[300px] focus:outline-none max-h-[100vh] rounded-none'>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Vendor Dashboard">
                  <Link href="/vendor/dashboard">
                <CommandItem>
                  <LayoutDashboard className='mr-2 h-4 w-4' />
                  <span>Dashboard</span>
                </CommandItem>
                  </Link>
              </CommandGroup>
            </CommandList>
          </Command>
      </>
    )
}
export function RetailerSidebar() {
    return (
      <>
           <Command className='bg-secondary left-0  w-[300px] focus:outline-none max-h-[100vh] rounded-none'>
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Vendor Dashboard">
                  <Link href="/vendor/dashboard">
                <CommandItem>
                  <LayoutDashboard className='mr-2 h-4 w-4' />
                  <span>Dashboard</span>
                </CommandItem>
                  </Link>
              </CommandGroup>
            </CommandList>
          </Command>
      </>
    )
}
