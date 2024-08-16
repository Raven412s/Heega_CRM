import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, MonthChangeEventHandler } from "react-day-picker"
import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { useState } from "react"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  const [selectedMonth, setSelectedMonth] = useState<Date>(new Date());

  const handleMonthChange: MonthChangeEventHandler = (month) => {
    setSelectedMonth(month);
  };

  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0",
        month: "space-y-4",
        caption: "flex justify-center pt-1 relative items-center",
        caption_label: "text-sm font-medium",
        nav: "space-x-1 flex items-center",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-full border-collapse space-y-1",
        head_row: "flex",
        head_cell:
          "text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]",
        row: "flex w-full mt-2",
        cell: "h-9 w-9 text-center text-sm p-0 relative",
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "h-9 w-9 p-0 font-normal aria-selected:opacity-100"
        ),
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => <ChevronLeft className="h-4 w-4" />,
        IconRight: ({ ...props }) => <ChevronRight className="h-4 w-4" />,
        Caption: ({ displayMonth }) => (
          <div className="flex items-center justify-between">
            <select
              value={displayMonth.getMonth()}
              onChange={(e) => handleMonthChange(new Date(selectedMonth.getFullYear(), Number(e.target.value)))}
              className="form-select"
            >
              {Array.from({ length: 12 }).map((_, index) => (
                <option key={index} value={index}>
                  {new Date(0, index).toLocaleString("default", { month: "long" })}
                </option>
              ))}
            </select>
            <select
              value={displayMonth.getFullYear()}
              onChange={(e) => handleMonthChange(new Date(Number(e.target.value), selectedMonth.getMonth()))}
              className="form-select"
            >
              {Array.from({ length: 100 }).map((_, index) => {
                const year = new Date().getFullYear() - index;
                return (
                  <option key={year} value={year}>
                    {year}
                  </option>
                );
              })}
            </select>
          </div>
        ),
      }}
      month={selectedMonth}
      onMonthChange={handleMonthChange}
      {...props}
    />
  );
}

Calendar.displayName = "Calendar"

export { Calendar }
