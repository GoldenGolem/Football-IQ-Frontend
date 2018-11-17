import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'classProfileKey'})
export class ClassProfileKey implements PipeTransform {
  transform(value: any): any {
    let val=value;
     if(value>=0&& value<=20){
       val='skill-vpoor';
    }else if(value>20&& value<=30){
      val='skill-poor';
    }else if(value>=30&& value<=40){
      val='skill-lpoor';
    }else if(value>=40&& value<=50){
      val='skill-average';
    }else if(value>=50&& value<=60){
      val='skill-vaverage';
    }else if(value>=60&& value<=70){
      val='skill-fair';
    }else if(value>=70&& value<=80){
      val='skill-good';
    }else if(value>=80&& value<=90){
      val='skill-vgood';
    }else if(value>=90&& value<=100){
      val='skill-excellent';
    }
 

return `${val}`;
  }
};