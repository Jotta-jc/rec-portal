export interface News {
  id: number;

  category_id: number;

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
  featured_order?: number;

  published_at: string;
  created_at: string;

  meta_description?: string;

  categories?: {
    name: string;
    slug: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export type NewsFormData = Pick<
  News,
  | "title"
  | "excerpt"
  | "content"
  | "category_id"
  | "featured"
  | "featured_order"
>;