import type { Metadata } from "next";
import { Montserrat, Roboto } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: {
    default: "Pulso Pádel — La guía para jugar mejor",
    template: "%s | Pulso Pádel",
  },
  description:
    "La guía para jugar mejor. Diagnóstico de nivel, ruta de mejora, comparador de palas, directorio de canchas y comunidad para jugadores de pádel en Chile y LATAM.",
  metadataBase: new URL("https://tupadel.com"),
  openGraph: {
    type: "website",
    locale: "es_CL",
    url: "https://tupadel.com",
    siteName: "tupadel",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${montserrat.variable} ${roboto.variable} h-full`}
    >
      <body className="min-h-full flex flex-col bg-canvas text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
