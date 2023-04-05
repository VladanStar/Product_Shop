import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  items: Product[] = [];
  constructor() {}

  public addToCart(product: Product) {
    this.items.push(product);
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
  }

}
