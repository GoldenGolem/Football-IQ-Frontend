import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatNumberKey'})
export class FormatNumberKey implements PipeTransform {
  transform(value: any): any {
    let val;
  if(typeof value==='number'){
    val=Number(value);
     if(parseInt(val) == val){
        val=Number(value);
    }
    else if(parseFloat(val) == val){
       val=val.toFixed(2);
    }
  }else{
    val=value;
  }

return `${val}`;
  }
};