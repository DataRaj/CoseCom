import {
  Clock,
  CheckCircle,
  PackageCheck,
  PackageX,
  Loader2,
  RepeatIcon,
  ShoppingCart,
} from "lucide-react";

export const orderStatuses = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
  },
  {
    value: "processing",
    label: "Processing",
    icon: Loader2,
  },
  {
    value: "shipped",
    label: "Shipped",
    icon: PackageCheck,
  },
  {
    value: "delivered",
    label: "Delivered",
    icon: CheckCircle,
  },
  {
    value: "cancelled",
    label: "Cancelled",
    icon: PackageX,
  },
];

export const orderTypes = [
  {
    label: "Sale",
    value: "Sale",
    icon: ShoppingCart,
  },
  {
    label: "Return",
    value: "Return",
    icon: RepeatIcon,
  },
];

export const paymentStatuses = [
  {
    value: "paid",
    label: "Paid",
    icon: CheckCircle,
  },
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
  },
  {
    value: "failed",
    label: "Failed",
    icon: PackageX,
  },
];
