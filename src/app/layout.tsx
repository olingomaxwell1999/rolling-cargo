import type { Metadata } from "next";
import "./shared/styles/globals.scss";
import Footer from "./shared/Components/Footer/Footer";
import ScrollToTopButton from "./shared/Components/ScrollToTopButton/ScrollToTopButton";
import Navbar from "./shared/Components/Navbar/Navbar";
import WhatsAppButton from "./shared/Components/WhatsAppButton/WhatsAppButton";
import GoogleAnalytics from "./shared/Components/Analytics/google";

export const metadata: Metadata = {
  title: "Rolling Cargo",
  description:
    "A world class cargo company in the World. We do both local and international shipping. Be it By air, By sea or By land. We do it all.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <GoogleAnalytics />
        <Navbar />
        {children}
        <WhatsAppButton />
        <ScrollToTopButton />
        <Footer />
      </body>
    </html>
  );
}
