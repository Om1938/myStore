export interface Product {
  _id: string;
  name: string;
  image?: string;
  price: {
    oldPrice?: number;
    currentPrice: number;
    discount?: number;
  };
  tags: string[];
  category: string;
  ratings?: {
    count?: number;
    rating?: number;
  };
}
