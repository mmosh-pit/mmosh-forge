import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletConnector from "./components/WalletConnector";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description: "Welcome to the MMOSH Forge App",
  title: "Forge | MMOSH",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <html lang="en">
      <body className={inter.className}>
              <div className='root-container'>
                  <div className='content-container'>
                  <WalletConnector>
                    {children}
                  </WalletConnector>
                  </div>
              </div>
      </body>
    </html>
  );
}
