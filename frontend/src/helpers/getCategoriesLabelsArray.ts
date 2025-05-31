import { Category } from "../model/dataset/Category";

export const getCategoriesLabelsArray = (categories: Category[]) => {
  return categories.map((category) => category.label);
};
