import type { Metadata } from "next";
import { Noto_Sans_Mono } from "next/font/google";
import "./globals.css";
import Query from "@/wrappers/query";
import Provider from "@/wrappers/wagmiProvider";
import Header from "@/components/header";
const noto = Noto_Sans_Mono({ subsets: ["latin"]});

export const metadata: Metadata = {
  title: "Linke.fi",
  description: "earn yield with ease",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={noto.className}>
        <Provider>
          <Query>  
            <Header/>
            {children}
        
          </Query>
        </Provider>
      </body>
    </html>
  );
}
