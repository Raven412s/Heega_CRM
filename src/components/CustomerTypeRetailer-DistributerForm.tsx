import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Controller } from "react-hook-form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const CustomerNotEUFormSection: React.FC<{ control: any; customerJoiningDate: (date: Date) => void; date: Date | undefined; form: any; }> = ({ control, customerJoiningDate, date, form }) => (
    <>
    <div className="flex gap-4">
      <div className="flex flex-col w-[300px]">
        <FormField
          control={control}
          name="customerJoiningDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Joining Date</FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[280px] justify-start text-left font-normal",
                        !customerJoiningDate &&
                          "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {customerJoiningDate ? (
                        format(customerJoiningDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <Calendar
                      mode="single"
                      selected={customerJoiningDate}
                      onSelect={(selectedDate) => {
                        if (selectedDate) {
                          setCustomerJoiningDate(selectedDate);
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
        <FormField
          control={control}
          name="salesTarget"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Sales Target</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter Sales Target"
                  {...field}
                />
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
          name="shopName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Shop Name</FormLabel>
              <FormControl>
                <Input placeholder="Shop Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={control}
          name="GST_Number"
          render={({ field }) => (
            <FormItem>
              <FormLabel>GST Number</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter GST Number"
                  {...field}
                />
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
  <FormLabel>GST Document</FormLabel>
  <FormControl>
    <Input type="file" {...field} />
  </FormControl>
  <FormMessage />
</FormItem>
)}
/>

      </div>
    </div>
  </>
);

export default CustomerNotEUFormSection;
