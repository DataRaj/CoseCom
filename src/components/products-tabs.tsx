import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function ProductsTabs() {
  return (
    <Tabs defaultValue="all-products">
      <TabsList>
        <TabsTrigger value="all-products">All Products</TabsTrigger>
        <TabsTrigger value="best-sellers">Best Sellers</TabsTrigger>
        <TabsTrigger value="out-of-stock">Out of Stock</TabsTrigger>
        <TabsTrigger value="archived">Archived</TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
