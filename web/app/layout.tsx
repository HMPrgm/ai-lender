import type { Metadata } from "next";
import { Providers } from './providers'
import "./globals.css";
import NavBar from "./navbar/NavBar";

import { Roboto } from "next/font/google";

const roboto = Roboto({
  weight: ['100','300','400','500', '700','900'], // Specify 
  subsets: ['latin'],            // Specify 
  variable: '--font-roboto',     // CSS 
});
export const metadata: Metadata = {
  title: "AI Loan Lending",
  description: "10x your loaning ability",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${roboto.variable} font-sans antialiased`}
      >
        <Providers>
          <NavBar />
          {children}
        </Providers>

      </body>
    </html>
  );
}
