import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://24rigging.com"),
  title: "24 Rigging — Motion & Rigging per il live",
  description:
    "Progettazione rigging, calcolo carichi, motion e automazione per concerti, eventi e installazioni. Rigging invisibile, spettacolo indimenticabile.",
  icons: { icon: "/favicon.ico" },
  alternates: { canonical: "https://24rigging.com" },
  openGraph: {
    type: "website",
    url: "https://24rigging.com",
    siteName: "24 Rigging",
    title: "24 Rigging — Motion & Rigging per il live",
    description:
      "Progettazione rigging, calcolo carichi, motion e automazione per il live.",
    images: ["/portfolio_gallery/portfolio-09.jpeg"],
  },
  twitter: {
    card: "summary_large_image",
    title: "24 Rigging — Motion & Rigging per il live",
    description:
      "Progettazione rigging, calcolo carichi, motion e automazione per il live.",
    images: ["/portfolio_gallery/portfolio-09.jpeg"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="it" className="dark">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
