import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'statusBig'})
export class StatusPipe implements PipeTransform {
  transform(status: string): string {
    return status[0].toUpperCase() + status.substring(1).toLowerCase();
  }
}
