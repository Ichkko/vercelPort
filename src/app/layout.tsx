import type { Metadata } from "next";

import { LanguageProvider } from "@/components/LanguageProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "G. Ichko | Full Stack Developer",
  icons: {
    icon: "/v.svg",
  },
  description:
    "Junior full-stack developer building clean interfaces and reliable backends with Next.js, Spring Boot, MySQL, and Flutter.",
  authors: [{ name: "G. Ichko" }],
  keywords: [
    "full stack developer",
    "Next.js",
    "Spring Boot",
    "React",
    "TypeScript",
    "portfolio",
    "Ulaanbaatar",
  ],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    siteName: "G. Ichko Portfolio",
    title: "G. Ichko | Full Stack Developer",
    description:
      "Junior full-stack developer building clean interfaces and reliable backends with Next.js, Spring Boot, MySQL, and Flutter.",
    images: [
      {
        url: "/assets/images/03b1f65f-a430-4d79-a3bd-d4cc83297d7e-1785171826292.jpg",
        width: 1200,
        height: 630,
        alt: "G. Ichko — Full Stack Developer Portfolio",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "G. Ichko | Full Stack Developer",
    description:
      "Junior full-stack developer building clean interfaces and reliable backends with Next.js, Spring Boot, MySQL, and Flutter.",
    images: [
      "/assets/images/03b1f65f-a430-4d79-a3bd-d4cc83297d7e-1785171826292.jpg",
    ],
  },
  alternates: {
    canonical: baseUrl,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "G. Ichko",
    url: baseUrl,
    image: "/assets/images/ichkkkko-1785171948972.jpg",
    jobTitle: "Full Stack Developer",
    worksFor: {
      "@type": "Organization",
      name: "Freelance",
    },
    sameAs: [
      "https://github.com/Ichkko",
      "https://www.linkedin.com/in/ichko",
      "https://www.instagram.com/iichh.kuu__/",
    ],
    email: "ichkoog79@gmail.com",
    telephone: "+976 8015 0920",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Ulaanbaatar",
      addressCountry: "MN",
    },
  };

  return (
    <html lang="mn" className="h-full antialiased" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationSchema),
          }}
        />
      </head>
      <body className="min-h-full font-sans">
        <ThemeProvider>
          <LanguageProvider>{children}</LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
