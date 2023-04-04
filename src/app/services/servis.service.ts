import { Injectable } from '@angular/core';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ServisService {
  products:Product[]=[]

  constructor() {
   
   }
}
