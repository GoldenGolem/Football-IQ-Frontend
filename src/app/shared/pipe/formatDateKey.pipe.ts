import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatDateKey'})
export class FormatDateKey implements PipeTransform {
  transform(value: any): any {
    let dateFromObjectId =  new Date(parseInt(value.substring(0, 8), 16) * 1000);
    let dd;
    dd=dateFromObjectId.getDate();
    let mm;
    mm=dateFromObjectId.getMonth()+1;
    if(dd<10){
   dd='0'+dd;
  }
if(mm<10){
     mm='0'+mm;
  }
    let dateValue=dd+'-'+mm+'-'+dateFromObjectId.getFullYear();
    // let dateFromObjectId1= Math.floor(dateFromObjectId.getTime() / 1000).toString(16) + "0000000000000000";

return `${dateValue}`;
  }
};