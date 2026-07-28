import { Dispatch, SetStateAction } from "react";
import { Category, NewsFormData } from "./news";

export interface NewsFormProps {
  formData: NewsFormData;
  setFormData: Dispatch<SetStateAction<NewsFormData>>;
}

export interface NewsSidebarProps extends NewsFormProps {
  categories: Category[];
  loading: boolean;
}