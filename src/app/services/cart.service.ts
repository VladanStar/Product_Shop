import { Injectable } from '@angular/core';
import { Product } from '../model/product';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: Product[] = [];
  cartService: any;

  private cartItemCount = new BehaviorSubject<number>(0); // dodajte ovu liniju
  constructor() {}

  public addToCart(product: Product) {
    this.items.push(product);
    this.cartItemCount.next(this.items.length); // emitujte novu vrednost
  }

  public getItems(): Product[] {
    return this.items;
  }
  public clearCart(): Product[] {
    this.items = [];
    return this.items;
  }
  public deleteItem(index: number): void {
    this.items.splice(index, 1);
    this.cartItemCount.next(this.items.length); // emitujte novu vrednost
  }
  public deleteProduct(product: Product): void {
    const index = this.items.findIndex((item) => item.id === product.id);
    if (index !== -1) {
      this.items.splice(index, 1);
      this.cartItemCount.next(this.items.length); // emitujte novu vrednost
    }
  }

  public getItemQuantity(product: Product): number {
    let count = 0;
    this.items.forEach((item) => {
      if (item.id === product.id) {
        count++;
      }
    });
    return count;
  }
  getCartItemCount(): BehaviorSubject<number> {
    return this.cartItemCount;
  }
}
