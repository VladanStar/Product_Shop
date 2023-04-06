import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/servis.service';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent implements OnInit {
  id: any;
  showDeletedMessage: boolean = true;
  searchText: any;
  totalLength: any;
  page: number = 1;
  p: any;

  products: Product[] = [];
  product: Product = {};

  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  sortDirection = 1;

  ngOnInit(): void {
    this.productService.getAll().subscribe((products) => {
      this.products = products;
    });
  }

  sortName(): void {
    this.products.sort((a: Product, b: Product): number => {
      if (a.name && b.name) {
        return this.sortDirection * a.name.localeCompare(b.name);
      } else {
        return 0;
      }
    });
    // flip sort direction
    this.sortDirection = -this.sortDirection;
  }
  sortPrice(): void {
    this.products.sort((a: Product, b: Product): number => {
      if (a.name && b.name) {
        return this.sortDirection * a.name.localeCompare(b.name);
      } else {
        return 0;
      }
    });
    // flip sort direction
    this.sortDirection = -this.sortDirection;
  }
}
