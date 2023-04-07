import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { Product } from 'src/app/model/product';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/services/servis.service';
import { CurrencyPipe } from '@angular/common';
import * as Papa from 'papaparse';

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
  sortDirectionPrice: number = 1; // smjer sortiranja, 1 za uzlazno, -1 za silazno

  products: Product[] = [];
  product: Product = {};
  filteredName: Product[] = [];
  pdfUrl!: string;
  constructor(
    private productService: ProductService,
    private route: ActivatedRoute,
    private router: Router,
    private auth: AuthService
  ) {

   
  }
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
      if (a.price && b.price) {
        return this.sortDirectionPrice * (a.price - b.price);
      } else {
        return 0;
      }
    });
    // flip sort direction
    this.sortDirectionPrice = -this.sortDirectionPrice;
  }

  exportToCsv() {
    const csv = Papa.unparse(this.products);
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'books.csv');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }





}
