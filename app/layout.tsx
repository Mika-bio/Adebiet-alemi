import type { Metadata } from "next";
import { PT_Serif, Source_Sans_3 } from "next/font/google";
import { Providers } from "@/components/Providers";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import "./globals.css";

const ptSerif = PT_Serif({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "700"],
  variable: "--font-pt-serif",
  display: "swap",
});

const sourceSans = Source_Sans_3({
  subsets: ["cyrillic", "latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-source-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Әдебиет Әлемі — Қазақ мектеп әдебиеті",
  description:
    "Қазақ мектептеріне арналған әдебиет платформасы: кітаптар, тарихи кино, тапсырмалар, жыр-күй және ақындар.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="kk">
      <body
        className={`${ptSerif.variable} ${sourceSans.variable} flex min-h-screen flex-col bg-cream font-sans antialiased`}
      >
        <Providers>
          <Navbar />
          <main className="flex-1 bg-paper-texture">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
