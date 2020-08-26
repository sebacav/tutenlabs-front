import { Pipe, PipeTransform } from '@angular/core';
import { Booking } from '../models/booking';
import { Observable, from, BehaviorSubject, of } from 'rxjs';
import { filter, map } from 'rxjs/operators';


@Pipe({
  name: 'operadores'
})
export class OperadoresPipe implements PipeTransform {

  transform(items: Booking[], operador: string, cantidad: number ): Observable<Booking[]> {
    // items.filter(item => item[operador] > cantidad);
    return of(items)
    // return items.pipe(map(result => result
      // ));
    // return items;
  }

}
