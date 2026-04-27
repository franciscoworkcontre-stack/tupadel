import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/api/", "/mi-padel/", "/auth/"] },
    ],
    sitemap: "https://tupadel.com/sitemap.xml",
  };
}
