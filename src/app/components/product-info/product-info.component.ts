import { Component, OnInit, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/servis.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css'],
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  id: any;
  cartItems: { product: Product; quantity: number }[] = [];
  product: Product = {};
  private subscription: Subscription = new Subscription();
  items: any;
  totalQuantity: number =0;


  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router,
public auth:AuthService
  ) {

  }


  ngOnInit(): void {

    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
       this.productService.get(this.id).subscribe((p) => {
        this.product = p;
        console.log(this.product);
      });
    }
    this.calculateCartItems();

  }
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
  addToCart() {
    this.cartService.addToCart(this.product);
    console.log(this.product);
    this.calculateCartItems();
  }



  private calculateCartItems(): void {
    const items = this.cartService.getItems().filter(item => item.id === this.id);
    const map = new Map<Product, number>();

    for (const item of items) {
      if (map.has(item)) {
        map.set(item, map.get(item)! + 1);
      } else {
        map.set(item, 1);
      }
    }

    this.cartItems = Array.from(map).map(([product, quantity]) => ({
      product,
      quantity,
    }));

  }
deleteCart() {
  this.cartItems = this.cartItems.filter(item => item.product.id !== this.id);
  this.cartService.deleteItem(this.id);
  this.calculateCartItems();
  this.cartService.updateCartItemCount();

 }
  getItemQuantity(product: Product): number {
    let count = 0;
    this.items.forEach((item: { id: string | undefined }) => {
      if (item.id === product.id) {
        count++;
      }
    });
    return count;
  }
  getCartItemCount(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }
  deletePhone(id: any) {
    if (confirm('Are you sure you want to delete this card?')) {
      this.productService.delete(id);
      this.cartService.updateCartItemCount();
    }
  }
}
