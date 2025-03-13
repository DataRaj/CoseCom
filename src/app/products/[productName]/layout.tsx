import Header from "@/components/store/store-header";
import Footer from "@/components/store/store-footer";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header products />
      {children}
      <Footer />
    </>
  );
}
