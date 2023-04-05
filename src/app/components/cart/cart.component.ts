import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/model/product';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  cartItems: { product: Product, quantity: number }[] = [];

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.calculateCartItems();
  }

  private calculateCartItems(): void {
    const items = this.cartService.getItems();
    const map = new Map<Product, number>();

    for (const item of items) {
      if (map.has(item)) {
        map.set(item, map.get(item)! + 1);
      } else {
        map.set(item, 1);
      }
    }

    this.cartItems = Array.from(map).map(([product, quantity]) => ({ product, quantity }));
  }

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.calculateCartItems();
  }
onDelete(product:Product):void{
this.cartService.deleteProduct(product)
this.calculateCartItems();
}
  onDeleteItem(index: number): void {
    this.cartService.deleteItem(index);
    this.calculateCartItems();
  }

  onClearCart(): void {
    this.cartService.clearCart();
    this.calculateCartItems();
  }

}
