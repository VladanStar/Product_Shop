import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { CurrencyPipe } from '@angular/common';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{
public items:Product[]=[];
  public checkoutForm!: FormGroup;

constructor( private cartService:CartService,
  private formBuilder:FormBuilder){
this.items=this.cartService.getItems();
this.checkoutForm=this.formBuilder.group({
name:[],
adderss:[],
email:[]
})
}

ngOnInit(): void {

}


}
