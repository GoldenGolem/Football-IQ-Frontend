import { Pipe, PipeTransform } from '@angular/core';

@Pipe({name: 'formatMarketValueKey'})
export class FormatMarketValueKey implements PipeTransform {
  transform(value: any): any {
    let val=value;
  let abs = Math.abs( val );
if ( abs >= Math.pow( 10, 12 ) ) {
// trillion
val = ( val / Math.pow( 10, 12 ) ).toFixed( 1 ) + "T";
} else if ( abs < Math.pow( 10, 12 ) && abs >= Math.pow( 10, 9 ) ) {
// billion
val = ( val / Math.pow( 10, 9 ) ).toFixed( 1 ) + "B";
} else if ( abs < Math.pow( 10, 9 ) && abs >= Math.pow( 10, 6 ) ) {
// million
val = ( val / Math.pow( 10, 6 ) ).toFixed( 1 ) + "M";
} else if ( abs < Math.pow( 10, 6 ) && abs >= Math.pow( 10, 3 ) ) {
// thousand
val = ( val / Math.pow( 10, 3 ) ).toFixed( 1 ) + "K";
}

return `${val}`;
  }
};