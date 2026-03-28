import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://beetstack.it",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    // Add more routes here as the project grows
  ];
}
