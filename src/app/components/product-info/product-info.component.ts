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

  product: Product = {};

  private subscription: Subscription = new Subscription();
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
  }
  ngOnDestroy(): void {
    if (this.subscription != null) {
      this.subscription.unsubscribe();
    }
  }
  addToCart() {
    this.cartService.addToCart(this.product);
    console.log(this.product);
  }
  deleteCart() {
    let id = this.id as string;
    if (confirm('Da li ste sigurni?')) {
      if (id) {
        this.productService.delete(this.id);
        this.router.navigate(['/']);
      }
    }
  }
}
