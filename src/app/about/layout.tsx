import type { Metadata } from "next";

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: "About G. Ichko | Full Stack Developer",
  description:
    "Learn about G. Ichko's journey in software engineering, skills in full-stack development, and passion for building user-friendly web solutions.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: `${baseUrl}/about`,
    siteName: "G. Ichko Portfolio",
    title: "About G. Ichko | Full Stack Developer",
    description:
      "Learn about G. Ichko's journey in software engineering, skills in full-stack development, and passion for building user-friendly web solutions.",
    images: [
      {
        url: "/assets/images/ichkkkko-1785171948972.jpg",
        width: 1200,
        height: 630,
        alt: "G. Ichko — About Page",
        type: "image/jpeg",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About G. Ichko | Full Stack Developer",
    description:
      "Learn about G. Ichko's journey in software engineering, skills in full-stack development, and passion for building user-friendly web solutions.",
    images: ["/assets/images/ichkkkko-1785171948972.jpg"],
  },
  alternates: {
    canonical: `${baseUrl}/about`,
  },
};

export default function AboutLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}