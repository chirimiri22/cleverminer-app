import { Category } from "./Category";

export type AttributeData = {
  title: string;
  categories: Category[];
  hidden?: boolean;
  numeric?: boolean;
  containsNull?: boolean
};
