// components/VendorFormSection.tsx
import React, { useState } from "react";
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { Button } from "../ui/button";
import { handleFileChange } from "@/utils/fileUtils";

interface VendorFormSectionProps {
  control: any;
  vendorJoiningDate: Date | undefined;
  setVendorJoiningDate: (date: Date | undefined) => void;
} 

const VendorFormSection: React.FC<VendorFormSectionProps> = ({
  control,
  vendorJoiningDate,
  setVendorJoiningDate,
}) => {
    const [gstDocument, setGstDocument] = useState<File | null>(null);
  return (
    <div className="flex gap-4">
      <div className="flex flex-col w-[300px]">
        <FormField
          control={control}
          name="vendorJoiningDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Joining Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={`w-[280px] justify-start text-left font-normal ${
                        !vendorJoiningDate ? "text-muted-foreground" : ""
                      }`}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {vendorJoiningDate ? (
                        format(vendorJoiningDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={vendorJoiningDate}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setVendorJoiningDate(selectedDate);
                          field.onChange(selectedDate);
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
        <FormField
          control={control}
          name="state"
          render={({ field }) => (
            <FormItem>
              <FormLabel>State</FormLabel>
              <FormControl>
                <Input placeholder="State Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>City</FormLabel>
              <FormControl>
                <Input placeholder="City Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
      <div className="flex flex-col w-[300px]">
        <FormField
          control={control}
          name="GST_Number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Number</FormLabel>
              <FormControl>
                <Input placeholder="Enter GST Number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
         <FormField
          control={control}
          name="gstDocument"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Aadhar Card Back</FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  {...field}
                  onChange={(e) => handleFileChange(e, setGstDocument)} // Call handleFileChange with field name
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {gstDocument && (
  <img
    src={URL.createObjectURL(gstDocument)}
    alt="Selected Aadhaar Card Front"
    className="w-full h-32 object-contain my-3"
  />
)}
      </div>
    </div>
  );
};

export default VendorFormSection;
