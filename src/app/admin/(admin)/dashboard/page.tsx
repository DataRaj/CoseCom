import { SalesChart } from "@/components/sales-chart";
import { RecentSales } from "@/components/traffic-chart";
import { Activity, CreditCard, DollarSign, ShoppingCart } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent } from "@/components/ui/tabs";

const metrics = [
  {
    id: 1,
    title: "Total Sales",
    value: "$68,450",
    percentageChange: "↑ 12%",
    icon: CreditCard,
  },
  {
    id: 2,
    title: "Total Orders",
    value: "820",
    percentageChange: "↓ 6%",
    icon: ShoppingCart,
  },
  {
    id: 3,
    title: "Net Profits",
    value: "$18,200",
    percentageChange: "↑ 12%",
    icon: DollarSign,
  },
  {
    id: 4,
    title: "Conversion Rate",
    value: "4.2%",
    percentageChange: "↓ 0.5%",
    icon: Activity,
  },
];

export default function Dashboard() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
      <Tabs
        orientation="vertical"
        defaultValue="overview"
        className="space-y-4"
      >
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <Card key={metric.id} className="bg-muted/10 border">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    {metric.title}
                  </CardTitle>

                  {<metric.icon className="size-4 text-muted-foreground" />}
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{metric.value}</div>
                  <p className="text-xs text-muted-foreground">
                    {metric.percentageChange} from last month
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-7">
            <Card className="col-span-1 lg:col-span-4 bg-muted/10 border">
              <CardHeader>
                <CardTitle>Sales Overview</CardTitle>
                <CardDescription>
                  You made $68,450 in total sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <SalesChart />
              </CardContent>
            </Card>
            <Card className="col-span-1 lg:col-span-3 bg-muted/10 border">
              <CardHeader>
                <CardTitle>Recent Orders</CardTitle>
                <CardDescription>
                  You made 820 orders this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <RecentSales />
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
