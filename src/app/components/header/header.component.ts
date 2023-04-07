import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent  implements OnInit{
constructor(private cartService:CartService,
  public auth: AuthService){
this.auth.updateLoginStatus(false)
  }

cartItemCount: number =0;

ngOnInit() {
  this.cartService.getCartItemCount().subscribe((count) => {
    this.cartItemCount = count;
  })

}
register() {
  this.auth.logout();
}

}
