import { Component , OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from 'src/app/services/servis.service';
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit{
constructor(private productService:ProductService,
  private router:Router,
 ){}
ngOnInit(): void {

}
addTodo(f:NgForm){
  // console.log(f.value)

this.productService.add(f.value);

window.alert('Product added');
this.router.navigate(['/']);

}

}
