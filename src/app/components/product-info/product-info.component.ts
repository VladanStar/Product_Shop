import { Component, OnInit, OnDestroy } from '@angular/core';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/servis.service';
import { CurrencyPipe } from '@angular/common';
import { Subscription } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

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
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.subscription = this.productService.get(this.id).subscribe((p) => {
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
    const items = this.cartService.getItems();
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
    let id = this.id as string;
        this.cartService.deleteItem(this.id);
   this.getCartItemCount();
        // this.router.navigate(['/checkout']);
        // this.router.navigate(['/']);


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
}
