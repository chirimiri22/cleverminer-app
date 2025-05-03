import { Category } from "../model/Category"

export const getCategoriesCountsArray = (categories: Category[]) => {
    return categories.map((category) => category.count)
}
