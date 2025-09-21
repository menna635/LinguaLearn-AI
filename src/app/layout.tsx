import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "LinguaLearn AI - Breaking Language Barriers in Education",
  description: "Make learning inclusive by translating, listening, and practicing study material in your own language.",
  keywords: "language learning, AI translation, education, study tools, multilingual",
  authors: [{ name: "LinguaLearn AI" }],
  openGraph: {
    title: "LinguaLearn AI - Breaking Language Barriers in Education",
    description: "Make learning inclusive by translating, listening, and practicing study material in your own language.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}