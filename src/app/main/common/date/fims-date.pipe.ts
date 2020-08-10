import { Inject, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { FimsDate, toISOString } from '../../../services/domain/date.converter';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'displayFimsDate',
  pure: true,
})
export class DisplayFimsDate extends DatePipe implements PipeTransform {
  constructor(@Inject(LOCALE_ID) locale: string) {
    super(locale);
  }

  transform(fimsDate: FimsDate, format = 'shortDate'): string {
    return super.transform(toISOString(fimsDate), format);
  }
}
