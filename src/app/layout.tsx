import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import WalletConnector from "./components/WalletConnector";
import { Session } from "next-auth";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  description:
    "MMOSH: The Stoked Token. Join us for an epic adventure beyond time, space and the death-grip of global civilization. Let’s make money fun!",
  title: "MMOSH App Forge",
  openGraph: {
    images: ["https://storage.googleapis.com/mmosh-assets/metadata_image.png"],
  },
};

export default function RootLayout({
  children,
  session,
}: Readonly<{
  session: Session;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <WalletConnector session={session}>{children}</WalletConnector>
      </body>
    </html>
  );
}
