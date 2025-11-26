import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header/Header";
import TanStackProvider from "@/components/TanStackProvider/TanStackProvider";
import { Manrope } from 'next/font/google';

export const manrope = Manrope({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
variable: '--font-manrope',
});


export const metadata: Metadata = {
  title: "Car Rent App | Your Personal Car in your app",
  description: "find a car of your dream by filter",
  openGraph: {
    title: "Car Rent App | Your Personal Car in your app",
    description: "find a car of your dream by filter",
    url: "https://09-auth-h135.vercel.app/",//
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={manrope.variable}>
        <TanStackProvider>
            <Header />
            {children}
        </TanStackProvider>
      </body>
    </html>
  );
}
