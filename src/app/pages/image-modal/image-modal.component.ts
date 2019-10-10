import { Component, OnInit, ViewChild } from '@angular/core';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { DownloadModalComponent } from '../download-modal/download-modal.component';

import { ShareModalComponent } from '../share-modal/share-modal.component';


@Component({
  selector: 'app-image-modal',
  templateUrl: './image-modal.component.html',
  styleUrls: ['./image-modal.component.scss']
})
export class ImageModalComponent implements OnInit {

  @ViewChild('slideshow') slideshow: any;

  images: Array<string>;
  index: number;
  image: string;
  imageSources: Array<string>;
  id: number;

  constructor(
    private bsModalService: BsModalService,
    public bsModalRef: BsModalRef,
    private modalService: BsModalService
  ) { }


  ngOnInit() {
    // const imageObj = this.images[this.index];
    // const imgKey = Object.keys(imageObj);
    // this.image = imageObj[imgKey[0]];
    // this.imageSources = this.images.map(image => {
    //   const img = Object.keys(image).map(function(key) {
    //     return image[key];
    //   });
    //   return img[0];
    // });
    // this.slideshow.slideIndex = this.index;
  }

  download() {
    window.open(this.image, '_blank');
  }

  openShare() {
    const options: ModalOptions = {
      class: 'share-modal mb-0 mx-auto',
      initialState: {
        images: this.images,
        id: this.id,
      },
    }
    this.bsModalService.show(ShareModalComponent, options);
  }

  favorite() {
    
  }

  downloadModal(images) {
    const options: ModalOptions = {
      class: 'download-modal mb-0 mx-auto',
      initialState: {
        images: images
      },
    }
    this.modalService.show(DownloadModalComponent, options);
    this.bsModalRef.hide();
  }
}
