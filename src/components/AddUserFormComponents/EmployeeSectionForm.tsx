// EmployeeFormSection.tsx
import React, { useState } from 'react';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { cn } from "@/lib/utils";
import { handleFileChange } from '@/utils/fileUtils';

const EmployeeFormSection: React.FC<{
  control: any;
  setDate: (date: Date) => void;
  date: Date | undefined;
  form: any;
 }> = ({ control, setDate, date, form }) => {
    const [aadharCardFront, setAadharCardFront] = useState<File | null>(null);
    const [aadharCardBack, setAadharCardBack] = useState<File | null>(null);



  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-[300px]">
        {/* Date of Joining */}
        <FormField
          control={control}
          name="employeeJoiningDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of Joining</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? (
                        format(date, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setDate(selectedDate);
                          field.onChange(selectedDate); // Ensure field.onChange is called with a Date
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Salary */}
        <FormField
          control={control}
          name="salary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Salary</FormLabel>
              <FormControl>
                <Input placeholder="Add Salary" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Wage/Advance */}
        <FormField
          control={control}
          name="wage_advance"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Wage/Advance</FormLabel>
              <FormControl>
                <Input placeholder="Enter Wage/Advance" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Employee Type */}
        <FormField
          control={control}
          name="employee_type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Employee Type</FormLabel>
              <FormControl>
                <Controller
                  name="employee_type"
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
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="accounts">Accounts</SelectItem>
                        <SelectItem value="sales">Sales</SelectItem>
                        <SelectItem value="digitalMedia">Digital Media</SelectItem>
                        <SelectItem value="workshop">Workshop</SelectItem>
                        <SelectItem value="packaging">Packaging</SelectItem>
                      </SelectContent>
                    </Select>
                  )}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col w-[300px]">
        {/* Aadhar Number */}
        <FormField
          control={control}
          name="aadharNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Aadhar Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* PAN Number */}
        <FormField
          control={control}
          name="PAN_Number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>PAN Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter PAN Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="bankAccountNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Bank Account Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter Bank Account Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  );
};

export default EmployeeFormSection;
