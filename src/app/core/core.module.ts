import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastrModule } from 'ngx-toastr';
// AngularFire2 Modules
import { AngularFireModule } from '@angular/fire';

import { ApiService } from './api.service';
import { environment } from '../../environments/environment';
import { SplitStringPipe } from './split-string.pipe';

@NgModule({
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-full-width',
      preventDuplicates: true,
    }),
    AngularFireModule.initializeApp(environment.firebase),
    HttpClientModule,
  ],
  declarations: [SplitStringPipe],
  providers: [
    ApiService,
  ],
  exports: [
    SplitStringPipe,
  ]
})
export class CoreModule { }
