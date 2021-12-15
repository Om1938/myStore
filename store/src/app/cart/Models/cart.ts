export interface Order {
  image: string;
  name: string;
  price: { currentPrice: number; discount: number; oldPrice: number };
  quantity: number;
}
