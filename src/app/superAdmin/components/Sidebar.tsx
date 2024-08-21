import React from 'react'
import {
    Command,
    CommandDialog,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
    CommandSeparator,
    CommandShortcut,
  } from "@/components/ui/command"
import { LayoutDashboard, User2, UserPlus2, UserRoundPen } from 'lucide-react'
import Link from 'next/link'
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"



const Sidebar = () => {
  return (
    <>
         <Command className='bg-secondary  left-0  w-[300px] focus:outline-none max-h-[100vh]'>
          <CommandInput placeholder="Type a command or search..." />
          <CommandList className='relative h-screen'>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup heading="Suggestions">
                <Link href="/superAdmin/dashboard">
              <CommandItem>
                <LayoutDashboard className='mr-2 h-4 w-4' />
                <span>Dashboard</span>
              </CommandItem>
                </Link>
              <Accordion type="single" collapsible>
                 <AccordionItem value="item-1">
                   <AccordionTrigger className='text-slate-500 mx-4'>User Management</AccordionTrigger>
                    <AccordionContent>
                        <Link href="/superAdmin/users/add">
                            <CommandItem>
                                <UserPlus2 className='mr-2 h-4 w-4' />
                                Add New User
                            </CommandItem>
                        </Link>
                        <Link href="/superAdmin/users/view">
                            <CommandItem>
                                <User2 className='mr-2 h-4 w-4' />
                                View All Users
                            </CommandItem>
                        </Link>

                    </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="item-2">
                   <AccordionTrigger className='text-slate-500 mx-4'>Product Management</AccordionTrigger>
                    <AccordionContent>
                        <Link href="/superAdmin/products/add">
                            <CommandItem>
                                <UserPlus2 className='mr-2 h-4 w-4' />
                                Add Products
                            </CommandItem>
                        </Link>
                        <Link href="/superAdmin/products/view">
                            <CommandItem>
                                <User2 className='mr-2 h-4 w-4' />
                                Products List
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

export default Sidebar
