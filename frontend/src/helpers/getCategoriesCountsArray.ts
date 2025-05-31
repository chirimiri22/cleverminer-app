import { Category } from "../model/dataset/Category";

export const getCategoriesCountsArray = (categories: Category[]) => {
  return categories.map((category) => category.count);
};
