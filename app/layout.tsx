import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://24rigging.com"),
  title: "24 Rigging — L'evoluzione del rigging",
  description:
    "Progettazione e ingegneria del rigging, calcolo dei carichi, direzione tecnica e motion control per concerti, festival, teatri e grandi produzioni dal vivo.",
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://24rigging.com" },
  openGraph: {
    type: "website",
    url: "https://24rigging.com",
    siteName: "24 Rigging",
    title: "24 Rigging — L'evoluzione del rigging",
    description:
      "Advanced rigging and motion solutions for concerts, festivals, theatres and large-scale productions.",
    images: ["/portfolio_gallery/str-11.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "24 Rigging — L'evoluzione del rigging",
    description:
      "Advanced rigging and motion solutions for concerts, festivals, theatres and large-scale productions.",
    images: ["/portfolio_gallery/str-11.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
