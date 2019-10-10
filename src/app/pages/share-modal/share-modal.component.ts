import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-share-modal',
  templateUrl: './share-modal.component.html',
  styleUrls: ['./share-modal.component.scss']
})
export class ShareModalComponent implements OnInit {

  images: Array<string>;
  id: number;
  link: string;

  constructor(
    public bsModalRef: BsModalRef,
    private toast: ToastrService,
  ) { }

  ngOnInit() {
    this.link = `https://primeshot.io/${this.id}`;
  }

  download() {
    this.images.forEach(imageObj => {
      const image = Object.keys(imageObj).map(function(key) {
        return imageObj[key];
      });
      window.open(image[0], "_blank");
    });
    this.bsModalRef.hide();
  }

  sendEmail() {
    window.open("mailto:?subject=Primeshot Picture Link&body= Look at these pictures taken of me! "+`https://primeshot.io/${this.id}`, '_self');
    this.bsModalRef.hide();
  }

  sendSMS() {
    window.open("sms:?&body=Check%20out%20my%20photos%20" + `https://primeshot.io/${this.id}` , "_self");
    this.bsModalRef.hide();
  }

  copied(e) {
    if (e.isSuccess) {
      this.toast.show('Link copied to clipboard.', '', {
        positionClass: 'toast-bottom-full-width'
      });
      this.bsModalRef.hide();
    }
  }
}
