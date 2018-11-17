import { Component } from '@angular/core';

// openDialog
@Component({
  selector: 'loading-dialog',
  template: ` <div class="box box-default">
          <div class="box-header">Please wait while we are generating PDF</div>
          <div class="box-body padding-lg"> <div class="row">              
              <div class="col-xl-12" style="text-align: center;">
                <md-progress-spinner mode="indeterminate"></md-progress-spinner>
              </div>
            </div> </div>
            </div>   `,
})
export class LoadingDialogComponent {}
