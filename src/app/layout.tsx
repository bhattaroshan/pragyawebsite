import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Poppins } from 'next/font/google'
import { NavigationMenuDemo } from "@/components/navigation";

const poppins = Poppins({
  weight: ['400', '700'],
  subsets: ['latin'],
})


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pragya Pokharel",
  description: "An educator",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className='w-screen'>
          <NavigationMenuDemo />
          <div className=''>
            {children}
          </div>
        </div>
        </body>
    </html>
  );
}
