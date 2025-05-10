export interface Product {
  id?: number;
  description: string;
  date: string;
  title: string;
  location: string;
  image:string;
  status: string;
  price : DoubleRange,
  }