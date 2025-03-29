import { Categories } from "@/shared/types/categories";

export interface SearchResult {
  title: string;
  name: string;
  description: string;
  category: Categories;
  iconURL: string;
  imageURL: string;
}
