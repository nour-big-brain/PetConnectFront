import { User } from "./user";

export type Status_Product = 'available' | 'sold';

export interface Product {
  id?: number;
  title: string;
  description: string;
  date: string;
  location: string;
  status: Status_Product;
  price: number;
  validated?: boolean;
  image?: string | null;
  user?: User;
}