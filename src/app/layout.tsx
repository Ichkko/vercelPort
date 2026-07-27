import type { Metadata } from "next";

import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://vercel-port-taupe.vercel.app"),
  title: "G. Ichko | Full Stack Developer",
  description:
    "Premium portfolio of G. Ichko — junior full stack developer building modern web and mobile products with Next.js, Spring Boot, and Flutter.",
  authors: [{ name: "G. Ichko" }],
  openGraph: {
    title: "G. Ichko | Full Stack Developer",
    description:
      "Junior full stack developer building clean interfaces and reliable backends.",
    images: ["/assets/images/03b1f65f-a430-4d79-a3bd-d4cc83297d7e-1785171826292.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="mn" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full font-sans">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>

        <script type="module" async src="https://static.rocket.new/rocket-web.js?_cfg=https%3A%2F%2Fvercelport1997back.builtwithrocket.new&_be=https%3A%2F%2Fappanalytics.rocket.new&_v=0.1.19" />
        <script type="module" defer src="https://static.rocket.new/rocket-shot.js?v=0.0.2" /></body>
    </html>
  );
}
