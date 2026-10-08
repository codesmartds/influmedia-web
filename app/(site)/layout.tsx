import type { Metadata } from "next";
import { Funnel_Display, Geist_Mono, Instrument_Sans } from "next/font/google";
import "./globals.css";

// Brand type: Funnel Display for headings, Instrument Sans for body copy,
// Geist Mono for eyebrows, labels and figures. All three are variable fonts.
const display = Funnel_Display({
  variable: "--font-funnel-display",
  subsets: ["latin"],
});

const sans = Instrument_Sans({
  variable: "--font-instrument-sans",
  subsets: ["latin"],
});

const mono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Influmedia | Lead the Conversation",
  description:
    "Estrategia, creatividad y tecnología para conectar marcas con personas reales.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="es"
      data-theme="influmedia-web"
      className={`${display.variable} ${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-base-100 text-base-content font-sans">
        {children}
      </body>
    </html>
  );
}
