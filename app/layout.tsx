import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Scrum Retrospective Tool",
  description: "Simple tool to run your Scrum Retrospectives",
};

const refreshColors = () => {
  return (
    <div>
      <div className="bg-red-100"></div>
      <div className="bg-red-300"></div>
      <div className="bg-blue-100"></div>
      <div className="bg-blue-300"></div>
      <div className="bg-green-100"></div>
      <div className="bg-green-300"></div>
      <div className="bg-gray-100"></div>
      <div className="bg-gray-300"></div>
    </div>
  );
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
