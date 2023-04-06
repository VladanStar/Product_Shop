import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Product } from 'src/app/model/product';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as Papa from 'papaparse';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {

  @ViewChild('myTable', { static: false }) tableRef!: ElementRef;
  [x: string]: any;
  submitForm(arg0: any) {
    throw new Error('Method not implemented.');
  }
  cartItems: { product: Product; quantity: number }[] = [];

  public checkoutForm: FormGroup;
  // name: any;
  // address: any;
  // email: any;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.checkoutForm = this.formBuilder.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
    });
  }

  totalPrice: any;
  totalP: any = 0;
  ngOnInit(): void {
    this.calculateCartItems();
    this.calculateTotalPrice();

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

  onAddToCart(product: Product): void {
    this.cartService.addToCart(product);
    this.calculateCartItems();
    this.calculateTotalPrice();


  }
  onDelete(product: Product): void {
    this.cartService.deleteProduct(product);
    this.calculateCartItems();
    this.calculateTotalPrice();
  }
  onDeleteItem(index: number): void {
    this.cartService.deleteItem(index);
    this.calculateCartItems();
    this.calculateTotalPrice();
  }

  onClearCart(): void {
    this.cartService.clearCart();
    this.calculateCartItems();
  }

  calculateTotalPrice(): void {
    let total = 0;
    for (const item of this.cartItems) {
      if (item.product && item.product.price) {
        // add null check here
        total += item.product.price * item.quantity;
      }
    }
    this.totalPrice = total;
    this.calculateCartItems();
  }
  clearTable() {
    const tableElement = this.tableRef.nativeElement;
    tableElement.innerHTML = '';
  }

  purcashe(){
this.checkoutForm.reset();
window.alert("the purchase order has been sent");
this.clearTable();
this.totalPrice=0;

  }

  public get name() {
    return this.checkoutForm.get('name');
  }

  public get address() {
    return this.checkoutForm.get('address');
  }

  public get email() {
    return this.checkoutForm.get('email');
  }
}
