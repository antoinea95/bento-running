import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import SessionWrapper from "./providers/SessionWrapper";
const cairo = Cairo({ subsets: ["latin"], weight: ["400", "700", "900"] });
import "@/app/styles/main.css";
import Image from "next/image";
import { DarkModeProvider } from "./providers/ThemeProvider";

export const metadata: Metadata = {
  title: "Bento Running",
  description: "Welcome to Bento Running: Your personalized dashboard box for summarizing your Strava running activities. Bento Running organizes your running activities into a clear and concise summary. Experience the simplicity and efficiency of Bento Running as it brings together your passion for running with the delight of staying informed.",
  icons: "../images/medal.svg",
  openGraph: {
    type: "website",
    url: "https://bento-running.vercel.app",
    title: "Bento Running",
    images: [{
      url: "https://bento-running.vercel.app/images/screen-dark.png"
    }],
    description: "Welcome to Bento Running: Your personalized dashboard box for summarizing your Strava running activities. Bento Running organizes your running activities into a clear and concise summary. Experience the simplicity and efficiency of Bento Running as it brings together your passion for running with the delight of staying informed.",
  }
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
        <DarkModeProvider>
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
        </DarkModeProvider>
        </body>
    </html>
    </SessionWrapper>
  );
}
