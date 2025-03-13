"use client";

import { Table } from "@tanstack/react-table";
import { PackageSearch, UserRoundSearch, X } from "lucide-react";

import { orderTypes, orderStatuses } from "@/lib/table-data";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DataTableViewOptions } from "./data-table-view-options";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="space-y-2">
      <div className="w-full flex flex-col gap-2 md:flex-row justify-between items-center p-2 bg-muted/10 border rounded-xl">
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Order Status"
            options={orderStatuses}
          />
        )}
        {table.getColumn("type") && (
          <DataTableFacetedFilter
            column={table.getColumn("type")}
            title="Order Type"
            options={orderTypes}
          />
        )}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <X className="ml-2 h-4 w-4" />
          </Button>
        )}
        <DataTableViewOptions table={table} />
      </div>
      <div className="w-full flex flex-col gap-10 md:flex-row  items-center p-2 bg-muted/10 border rounded-xl">
        <div className="flex gap-2 items-center">
          <PackageSearch className="text-muted-foreground" strokeWidth={1} />
          <Input
            placeholder="Filter by product..."
            value={
              (table.getColumn("product")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("product")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
        <div className="flex gap-2 items-center">
          <UserRoundSearch className="text-muted-foreground" strokeWidth={1} />
          <Input
            placeholder="Filter by customer..."
            value={
              (table.getColumn("customer")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("customer")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
        </div>
      </div>
    </div>
  );
}
