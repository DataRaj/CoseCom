"use client";

import { BreadcrumbItem, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { usePathname } from "next/navigation";

import React from "react";

export default function BreadcrumbPagePathname() {
  const pathname = usePathname().split("/").splice(2, 3).join("");
  return (
    <BreadcrumbItem>
      <BreadcrumbPage>{pathname}</BreadcrumbPage>
    </BreadcrumbItem>
  );
}
