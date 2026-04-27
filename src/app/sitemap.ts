import { MetadataRoute } from "next";

const BASE = "https://tupadel.com";

const ciudades = ["santiago", "concepcion", "vina-del-mar", "antofagasta", "la-serena", "temuco"];

const palas = [
  "bullpadel-vertex-04", "nox-at10-genius", "adidas-metalbone-hrd",
  "head-delta-pro-2026", "bullpadel-hack-04", "babolat-air-veron",
  "siux-diablo-rx", "nox-ml10-pro-cup",
];

const golpes = [
  "bandeja", "vibora", "remate", "globo", "x3", "x4",
  "contrapared", "dejada", "chiquita", "salida-de-pared",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const static_: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "daily", priority: 1 },
    { url: `${BASE}/diagnostico`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/palas`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE}/canchas`, lastModified: now, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE}/categorias`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/golpes`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/tacticas`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/drills`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/torneos`, lastModified: now, changeFrequency: "daily", priority: 0.7 },
    { url: `${BASE}/reglas`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/glosario`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "daily", priority: 0.6 },
  ];

  const catPages: MetadataRoute.Sitemap = [1, 2, 3, 4, 5, 6].map((n) => ({
    url: `${BASE}/categorias/${n}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const palaPages: MetadataRoute.Sitemap = palas.map((p) => ({
    url: `${BASE}/palas/${p}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.8,
  }));

  const ciudadPages: MetadataRoute.Sitemap = ciudades.map((c) => ({
    url: `${BASE}/canchas/${c}`,
    lastModified: now,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const golpePages: MetadataRoute.Sitemap = golpes.map((g) => ({
    url: `${BASE}/golpes/${g}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...static_, ...catPages, ...palaPages, ...ciudadPages, ...golpePages];
}
