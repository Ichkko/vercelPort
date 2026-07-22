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
    images: ["/gg.png"],
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
      </body>
    </html>
  );
}
