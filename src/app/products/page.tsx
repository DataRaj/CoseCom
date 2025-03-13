// import { redirect } from "next/navigation";

// export default function Home() {
//   redirect("/products/eternal-youth");
// }

import Footer from "@/components/store/store-footer";
import Header from "@/components/store/store-header";
import Products from "@/components/store/store-products";
import React from "react";

export default function page() {
  return (
    <>
      <Header products />
      <Products />
      <Footer />
    </>
  );
}
