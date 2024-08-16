"use client";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { role } from "./data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
// import { DataTableViewOptions } from "@/components/ui/data-table-view-options";

import { useEffect, useState } from "react";
import { DataTableViewOptions } from "./data-table-view-options";
import { TrashIcon } from "lucide-react";
import { CalendarDatePicker } from "./calendar-date-picker";
import { useRouter } from "next/navigation";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}
export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
      const router = useRouter();

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("date")?.setFilterValue([from, to]);
  };
  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter labels..."
          value={(table.getColumn("name")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("name")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("role") && (
          <DataTableFacetedFilter
            column={table.getColumn("role")}
            title="role"
            options={role}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[250px]"
          variant="outline"
        />
      </div>

      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}



interface DataTableToolbarPropsForProducts<TData> {
    table: Table<TData>;
  }

export function DataTableToolbarForProducts<TData>({
  table,
}: DataTableToolbarPropsForProducts<TData>) {
    const isFiltered = table.getState().columnFilters.length > 0;
      const router = useRouter();

  const [dateRange, setDateRange] = useState<{ from: Date; to: Date }>({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }: { from: Date; to: Date }) => {
    setDateRange({ from, to });
    // Filter table data based on selected date range
    table.getColumn("date")?.setFilterValue([from, to]);
  };

  type Category = {
    _id: string;
    name: string;
    parent?: string;
    description?: string;
  };

  const [categories, setCategories] = useState<Category[]>([]); // State to store categories
  useEffect(() => {
    // Fetch categories from the database
   const fetchCategories = async()=>{
   await fetch("/api/categories")
    .then((response) => response.json())
    .then((data) => {setCategories(data);})
    .catch((error) => console.error("Error fetching categories:", error));
   }
   fetchCategories()
  }, [setCategories]);


 const category = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));



  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder="Filter labels..."
          value={(table.getColumn("itemName")?.getFilterValue() as string) ?? ""}
          onChange={(event) => {
            table.getColumn("itemName")?.setFilterValue(event.target.value);
          }}
          className="h-8 w-[150px] lg:w-[250px]"
        />
        {table.getColumn("category") && (
          <DataTableFacetedFilter
            column={table.getColumn("category")}
            title="Category"
            options={category}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
        <CalendarDatePicker
          date={dateRange}
          onDateSelect={handleDateSelect}
          className="h-9 w-[250px]"
          variant="outline"
        />
      </div>

      <div className="flex items-center gap-2">
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
