import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MasonryGalleryModule } from 'ngx-masonry-gallery';

import { AgmCoreModule } from '@agm/core';
import { StarRatingModule } from 'angular-star-rating';
import { NgxMaskModule } from 'ngx-mask';
import { ModalModule, BsDropdownModule } from 'ngx-bootstrap';
import { ClipboardModule } from 'ngx-clipboard';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';
import { SlideshowModule } from 'ng-simple-slideshow';

import { AppComponent } from './app.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { CollectionComponent } from './pages/collection/collection.component';

import { ImageModalComponent } from './pages/image-modal/image-modal.component';
import { ShareModalComponent } from './pages/share-modal/share-modal.component';
import { NgxIntlTelInputModule } from 'ngx-intl-tel-input';
import { LightboxModule } from 'ngx-lightbox';
import { DownloadModalComponent } from './pages/download-modal/download-modal.component';
import { ConfirmModalComponent } from './pages/confirm-modal/confirm-modal.component';
import { MessageModalComponent } from './pages/message-modal/message-modal.component';

@NgModule({
  declarations: [
    AppComponent, HomePageComponent, ImageModalComponent, ShareModalComponent, CollectionComponent, DownloadModalComponent, ConfirmModalComponent, MessageModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule,
    FormsModule,
    ReactiveFormsModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCzxILbLsr2A_0YPUNawY6CKft18AIOZqU'
    }),
    StarRatingModule.forRoot(),
    NgxMaskModule.forRoot(),
    ModalModule.forRoot(),
    SlideshowModule,
    ClipboardModule,
    BsDropdownModule.forRoot(),
    NgxIntlTelInputModule,
    LightboxModule,
    MasonryGalleryModule
  ],
  providers: [],
  entryComponents: [
    ImageModalComponent,
    ShareModalComponent,
    DownloadModalComponent,
    ConfirmModalComponent,
    MessageModalComponent
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
