import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { Product } from '../model/product';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private db: AngularFireDatabase) {}

  getAll(): Observable<Product[]> {
    return this.db
      .list<Product>('/products')
      .snapshotChanges()
      .pipe(
        map((x) =>
          x.map((y: any) => ({
            id: y.payload.key,
            ...(y.payload.val() as Product),
          }))
        )
      );
  }
  get(id: string): Observable<Product> {
    return this.db
      .object<Product>('/products/' + id)
      .snapshotChanges()
      .pipe(
        map((x: any) => ({
          id: x.payload?.key,
          ...(x.payload.val() as Product),
        }))
      );
  }
  update(productId: string, Product: Product): void {
    this.db.object<Product>('/products/' + productId).update(Product);
  }
  add(Product: Product) {
    this.db.list('/products').push(Product);
  }
  delete(productId: any) {
    this.db.object<Product>('/products/' + productId).remove();
  }
}
