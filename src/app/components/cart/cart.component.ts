import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { nameValidator } from './name.validator';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  public items: Product[] = [];
  public checkoutForm!: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.items = this.cartService.getItems();
    this.checkoutForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      address: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {}

  public get name() {
    return this.checkoutForm.get('name');
  }
  public get address() {
    return this.checkoutForm.get('address');
  }
  public get email() {
    return this.checkoutForm.get('email');
  }
  submitForm(data: any) {
    console.log(data);
    if (!this.checkoutForm.valid) {
      window.alert('Not valid');
      return;
    }
    this.items = this.cartService.clearCart();
    this.checkoutForm.reset();
  }
}
