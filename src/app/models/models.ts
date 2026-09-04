export interface Product {
  id: number;
  name: string;
  price: number;
  vat: number;
}

export interface Purchase {
  id: number;
  productName: string;
  username: string;
  price: number;
  vat: number;
  date: string;
}
