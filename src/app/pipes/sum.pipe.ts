import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../model/product';

@Pipe({
  name: 'sum',
})
export class SumPipe implements PipeTransform {
  transform(product: Product[]): any {
    return product
      .map((p) => p.price)
      .reduceRight((acc: any, next) => acc + next);
  }
}
