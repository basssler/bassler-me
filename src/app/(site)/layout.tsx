import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navbar />
      <main className="mx-auto w-full max-w-screen-2xl flex-grow px-6 pb-12 pt-12 md:px-12 md:pt-24">
        {children}
      </main>
      <Footer />
    </>
  );
}
