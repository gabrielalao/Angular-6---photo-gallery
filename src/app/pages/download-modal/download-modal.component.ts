import { Component, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ConfirmModalComponent} from '../confirm-modal/confirm-modal.component'

@Component({
  selector: 'app-download-modal',
  templateUrl: './download-modal.component.html',
  styleUrls: ['./download-modal.component.scss']
})
export class DownloadModalComponent implements OnInit {

  cost: Number;
  backgroundColor1: String;
  fontColor1: String;
  backgroundColor3: String;
  fontColor3: String;
  backgroundColor5: String;
  fontColor5: String;
  donate: Number;

  constructor(
    public bsModalRef: BsModalRef,
    private toast: ToastrService,
    private modalService: BsModalService
  ) { 
    this.cost = 20;
    this.donate = 1;
    this.backgroundColor1 = "#000";
    this.backgroundColor3 = "#fff";
    this.backgroundColor5 = "#fff";
    this.fontColor1 = "#fff";
    this.fontColor3 = "#000";
    this.fontColor5 = "#000";
  }

  ngOnInit() {
  }

  confirm() {
    const options: ModalOptions = {
      class: 'confirm-modal mb-0 mx-auto',
    }
    this.modalService.show(ConfirmModalComponent, options);
    this.bsModalRef.hide();
  }

  plus(cost) {
    this.cost = cost + this.donate;
  }

  min(cost) {
    var temp: any = this.donate;
    this.cost = cost - temp;
  }

  chooseCost(id) {
    switch(id) {
      case 1: {
        this.backgroundColor1 = "#000";
        this.fontColor1 = "#fff";
        this.backgroundColor3 = "#fff";
        this.fontColor3 = "#000";
        this.backgroundColor5 = "#fff";
        this.fontColor5 = "#000";
        this.donate = 1;
        break;
      }
      case 3: {
        this.backgroundColor1 = "#fff";
        this.fontColor1 = "#000";
        this.backgroundColor3 = "#000";
        this.fontColor3 = "#fff";
        this.backgroundColor5 = "#fff";
        this.fontColor5 = "#000";
        this.donate = 3;
        break;
      }
      case 5: {
        this.backgroundColor1 = "#fff";
        this.fontColor1 = "#000";
        this.backgroundColor3 = "#fff";
        this.fontColor3 = "#000";
        this.backgroundColor5 = "#000";
        this.fontColor5 = "#fff";
        this.donate = 5;
        break;
      }
    }
  }
}
