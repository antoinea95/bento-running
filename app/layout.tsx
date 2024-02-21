import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import SessionWrapper from "./providers/SessionWrapper";
const cairo = Cairo({ subsets: ["latin"], weight: ["400", "700", "900"] });
import "@/app/styles/main.css";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Bento Running",
  description: "A Bento dashboard where you can track your strava runs",
  icons: "../images/medal.svg",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <SessionWrapper>
    <html lang="en">
          <body className={cairo.className}>
        {children}
        <div className="credits">
          <p>Powered by</p>
          <Image
            src="/images/strava-logo.webp"
            width={30}
            height={30}
            alt="Strava logo"
          />
        </div>
        </body>
    </html>
    </SessionWrapper>
  );
}
