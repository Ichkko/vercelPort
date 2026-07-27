import type { Metadata } from "next";
import { PortfolioShell } from "@/components/PortfolioShell";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "G. Ichko | Full Stack Developer",
  description:
    "Junior full-stack developer building clean interfaces and reliable backends with Next.js, Spring Boot, MySQL, and Flutter.",
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
  alternates: {
    canonical: baseUrl,
  },
};

export default function Home() {
  return <PortfolioShell />;
}
