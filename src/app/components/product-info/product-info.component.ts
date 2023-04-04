import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/servis.service';
import {CurrencyPipe}from"@angular/common"


@Component({
  selector: 'app-product-info',
  templateUrl: './product-info.component.html',
  styleUrls: ['./product-info.component.css']
})
export class ProductInfoComponent implements OnInit {
  id: any;

  product: Product = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  ngOnInit(): void {
    this.id= this.route.snapshot.paramMap.get("id")
    if(this.id){


    this.productService.get(this.id).subscribe(p => {
     this.product = p;
     console.log(this.product);
   });
 }
}
}
