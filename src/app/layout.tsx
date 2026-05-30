import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import 'bootstrap/dist/css/bootstrap.min.css';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "UERJ - Álgebra Linear Computacional",
  description: "UERJ - Álgebra Linear Computacional",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <Script src="https://cdnjs.cloudflare.com/ajax/libs/mathjs/12.4.2/math.min.js"></Script>
        <Script src="https://cdn.jsdelivr.net/npm/mathjax@4/tex-chtml.js" />
      </head>
      <body>{children}</body>
    </html>
  );
}
