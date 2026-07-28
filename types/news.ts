export interface News {
  id: number;

  category_id: number | null;

  title: string;
  subtitle?: string;
  excerpt: string;
  content: string;
  slug: string;

  featured_image: string;
  image_url?: string;

  author: string;
  read_time: number;

  featured: boolean;
  featured_order: number | null;

  published_at: string;
  created_at: string;

  meta_description?: string;

  categories?: {
    name: string;
    slug: string;
  };
}