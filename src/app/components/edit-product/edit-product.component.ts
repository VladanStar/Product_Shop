import { Component, OnInit } from '@angular/core';
import { update } from '@angular/fire/database';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product';
import { ProductService } from 'src/app/services/servis.service';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css'],
})
export class EditProductComponent implements OnInit {
  id: any;
  product: Product = {
    name: '',
    productId: '',
    descr: '',
    price: 0,
  };
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.get(this.id).subscribe((p) => {
        this.product = p;
        console.log(this.product);
      });
    }
  }

  editPhone(f: NgForm) {
    // console.log(f.value)
    let id = this.id as string;
    this.productService.update(id, f.value);
    window.alert('Phone is Edited');
    this.router.navigate(['/']);
    // f.reset();
  }
}
