export class Order {
  _id: string;
  image: string;
  name: string;
  price: {
    currentPrice: number;
    discount: number;
    oldPrice: number;
  };
  quantity: number;

  constructor(order: {
    _id: string;
    image: string;
    name: string;
    price: {
      currentPrice: number;
      discount: number;
      oldPrice: number;
    };
    quantity: number;
  }) {
    this._id = order._id;
    this.image = order.image;
    this.name = order.name;
    this.price = order.price;
    this.quantity = +order.quantity;
  }

  increaseQuantity(qty: number) {
    if (qty <= 0) return;
    this.quantity += qty;
  }

  decreaseQuantity(qty: number) {
    console.log(this.quantity, this.quantity <= 0);

    if (qty <= 0 || this.quantity <= 0) return;
    this.quantity -= qty;
  }

  getTotalPrice() {
    return this.quantity * this.price.oldPrice;
  }

  getTotalDiscount() {
    return this.quantity * this.price.discount;
  }

  getTotalDiscountedPrice() {
    return this.quantity * this.price.currentPrice;
  }
}
