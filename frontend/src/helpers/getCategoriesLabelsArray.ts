import { Category } from "../model/Category"

export const getCategoriesLabelsArray = (categories: Category[]) => {
    return categories.map((category) => category.label)
}
