import { DataTable } from "@/components/dashboard-orders/data-table";
import { columns } from "@/components/dashboard-orders/columns";
import { orders } from "@/lib/orders";

export default function Orders() {
  return <DataTable data={orders} columns={columns} />;
}
