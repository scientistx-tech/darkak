import { MetadataRoute } from 'next';

type RefreshType = 'weekly' | 'monthly' | 'yearly';

interface Sitemap {
  id: number;
  title: string;
  url: string;
  priority: number;
  date: string; // or Date if you parse it
  refresh: RefreshType;
}

// export async function generateSitemaps() {
//   // Fetch the total number of products and calculate the number of sitemaps needed
//   return [{ id: 0 }, { id: 1 }, { id: 2 }, { id: 3 }];
// }

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Google's limit is 50,000 URLs per sitemap
  const maps = await getSiteMap();
  return maps.map((data: Sitemap) => ({
    url: data.url,
    lastModified: data.date,
    changeFrequency: data.refresh,
    priority: data.priority,
  }));
}
const getSiteMap = async () => {
  const res = await fetch(`https://api.darkak.com.bd/api/public/sitemap`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return res.json();
};
