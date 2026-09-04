import { Injectable, signal } from '@angular/core';
import { Product, Purchase } from '../models/models';

const PRODUCTS_KEY = 'dashboard_products';
const PURCHASES_KEY = 'dashboard_purchases';
const AUTH_KEY = 'dashboard_auth';

const INITIAL_PRODUCTS: Product[] = [
  { id: 1, name: 'Ноутбук ASUS VivoBook 15', price: 54990, vat: 20 },
  { id: 2, name: 'Монитор Dell 27"', price: 23490, vat: 20 },
  { id: 3, name: 'Клавиатура Logitech MX Keys', price: 8990, vat: 20 },
  { id: 4, name: 'Мышь Logitech MX Master 3S', price: 7490, vat: 20 },
  { id: 5, name: 'Наушники Sony WH-1000XM5', price: 29990, vat: 20 },
];

const INITIAL_PURCHASES: Purchase[] = [
  { id: 1, productName: 'Ноутбук ASUS VivoBook 15', username: 'test', price: 54990, vat: 20, date: '2025-08-15' },
  { id: 2, productName: 'Монитор Dell 27"', username: 'test', price: 23490, vat: 20, date: '2025-08-20' },
  { id: 3, productName: 'Клавиатура Logitech MX Keys', username: 'test', price: 8990, vat: 20, date: '2025-09-01' },
  { id: 4, productName: 'Мышь Logitech MX Master 3S', username: 'test', price: 7490, vat: 20, date: '2025-09-02' },
  { id: 5, productName: 'Наушники Sony WH-1000XM5', username: 'test', price: 29990, vat: 20, date: '2025-09-03' },
];

@Injectable({ providedIn: 'root' })
export class StorageService {
  private productsSignal = signal<Product[]>(this.loadProducts());
  private purchasesSignal = signal<Purchase[]>(this.loadPurchases());

  readonly products = this.productsSignal.asReadonly();
  readonly purchases = this.purchasesSignal.asReadonly();

  private loadProducts(): Product[] {
    try {
      const data = localStorage.getItem(PRODUCTS_KEY);
      if (data) {
        return JSON.parse(data) as Product[];
      }
    } catch {
      localStorage.removeItem(PRODUCTS_KEY);
    }
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(INITIAL_PRODUCTS));
    return [...INITIAL_PRODUCTS];
  }

  private loadPurchases(): Purchase[] {
    try {
      const data = localStorage.getItem(PURCHASES_KEY);
      if (data) {
        return JSON.parse(data) as Purchase[];
      }
    } catch {
      localStorage.removeItem(PURCHASES_KEY);
    }
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(INITIAL_PURCHASES));
    return [...INITIAL_PURCHASES];
  }

  private saveProducts(products: Product[]): void {
    localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products));
  }

  private savePurchases(purchases: Purchase[]): void {
    localStorage.setItem(PURCHASES_KEY, JSON.stringify(purchases));
  }

  private nextProductId(): number {
    const products = this.productsSignal();
    return products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1;
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newProduct: Product = { ...product, id: this.nextProductId() };
    this.productsSignal.update(list => [...list, newProduct]);
    this.saveProducts(this.productsSignal());
  }

  updateProduct(updated: Product): void {
    this.productsSignal.update(list =>
      list.map(p => (p.id === updated.id ? updated : p))
    );
    this.saveProducts(this.productsSignal());
  }

  deleteProduct(id: number): void {
    this.productsSignal.update(list => list.filter(p => p.id !== id));
    this.saveProducts(this.productsSignal());
  }

  getAuth(): boolean {
    return localStorage.getItem(AUTH_KEY) === 'true';
  }

  setAuth(value: boolean): void {
    localStorage.setItem(AUTH_KEY, String(value));
  }
}
