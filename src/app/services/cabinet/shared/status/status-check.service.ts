import { Injectable } from '@angular/core';
import { StatusEnum } from '../../../../models/common/status/enums/statuses.enum';
import { Base } from '../../../../models/cabinet/users/base.model';

@Injectable({
  providedIn: 'root'
})

export class StatusCheckService {

  public getActiveRecords(records: Base[]): Base[] {
    return records.filter(item => item.status === StatusEnum.ACTIVE);
  }

}
