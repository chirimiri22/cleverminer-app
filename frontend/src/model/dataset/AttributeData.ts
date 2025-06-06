import { Category } from "./Category";

export type AttributeData = {
  title: string;
  categories: Category[];
  hidden?: boolean;
  numeric?: string[];
  containsNull?: Boolean
};
