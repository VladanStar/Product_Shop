import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { CartService } from 'src/app/services/cart.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent  implements OnInit{
public items:Product[]=[];

constructor( private cartService:CartService){
this.items=this.cartService.getItems()
}

ngOnInit(): void {

}


}
