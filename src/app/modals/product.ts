import { Post } from "./post";
import { User } from "./user";

export interface Product extends Post{
  id?: number;
  status: string;
  price : DoubleRange,
  }