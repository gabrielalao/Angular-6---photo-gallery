import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { BsModalService, ModalOptions } from 'ngx-bootstrap/modal';
import { ImageModalComponent } from '../image-modal/image-modal.component';
import { ApiService } from '../../core/api.service';
import { ShareModalComponent } from '../share-modal/share-modal.component';
import { DownloadModalComponent } from '../download-modal/download-modal.component';
import * as moment from 'moment';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { style } from '@angular/animations';
import { MessageModalComponent } from '../message-modal/message-modal.component';

 export interface IUser {
   email: string;
   first: string;
   instagram: string;
   joined: string;
   last: string;
   paypal: string;
   profileImages: string;
   uid: string;
   username: string;
   website: string;
}

export interface ICollection {
  address: string;
  countryState: string;
  id: string;
  imageUrls: object[];
  isCompleted: boolean;
  latitude: number;
  longitude: number;
  phoneNumbers: object[];
  qrId: number;
  time: string;
  timeFormatted: string;
  userId: string;
}

export interface IDataFetch {
  key: string;
  verified: boolean;
  user: IUser;
  data: ICollection;
}


@Component({
  selector: 'collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.scss']
})
export class CollectionComponent implements OnInit {

  fetchData: Observable<any>;
  fetchedData: IDataFetch; 
  photoNum: number;
  comment: string;
  rating: number;
  phoneNumber: string;
  fbKey: string;
  favs: Object = {};

  userInstagram: string;
  username: string;

  queryId: number;

  isLoading = false;
  isInit = false;
  mapstyle = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
];

styles: any[] = [
  {elementType: 'geometry', stylers: [{color: '#242f3e'}]}
]

phonesForm = new FormGroup({
    phone: new FormControl(undefined, [Validators.required])
  });

  constructor(
    private activeRoute: ActivatedRoute,
    private apiService: ApiService,
    private toast: ToastrService,
    private modalService: BsModalService,
  ) { }

  ngOnInit() {
    this.activeRoute.params.subscribe(async(routeParams) => {
      if (routeParams.id) {
        this.queryId = Number(routeParams.id);
        this.fetchData = this.apiService.fetch(routeParams.id);
        this.apiService.fetch(routeParams.id).subscribe((res: IDataFetch) => {
          this.fetchedData = res;
          if (this.fetchedData && this.fetchedData.data && this.fetchedData.data.time) {
            this.fetchedData.data.timeFormatted = moment(this.fetchedData.data.time).format('LLLL');
          }
          this.isInit = true;
          this.fbKey = res['key'];
          this.userInstagram = res['user'].instagram;
          this.username = res['user'].username;
          if (this.fetchedData && this.fetchedData.data)
          {
            this.photoNum = this.fetchedData.data.imageUrls.length;
            console.log(this.photoNum)
          }
        }, (err) => {
            this.isInit = true;
        });
      }
    });
    
    this.comment = "Very good!";
    this.rating = 4;
    this.phoneNumber = '';
  }

  onMorePhotos() {
    const count = this.fetchedData.data.imageUrls.length;
    if (count > this.photoNum + 5) {
      this.photoNum += 5;
    } else {
      this.photoNum += count - this.photoNum;
    }
  }

  onSubmit() {
    if (this.fbKey) {
      const phone = this.phonesForm.value.phone.internationalNumber;

      this.isLoading = true;
      this.apiService.submit(this.fbKey, phone).subscribe(res => {
        this.isLoading = false;
        console.log('submit success', res);
        this.notify('success', 'Thank you. You will be notified via text when your photos are ready!');
        this.apiService.sendSMS(phone).subscribe(status=> {
          console.log('sent sms = ', status)
        }, error => {
          console.log('sms error', error)
        });
      }, error => {
        this.isLoading = false;
        console.log('submit error', error)
        this.notify('error', 'Sorry. Phone Number submission failed. Please try it again.');
      });
    } else {
      console.log('Invalid submission');
      this.notify('error', 'Invalid submission. Please check query ID or Phone number validation.');
    }
  }

  notify(type, msg) {
    if (type === 'success') {
      this.toast.success(msg);
    } else if (type === 'error') {
      this.toast.error(msg);
    } else {
      this.toast.warning(msg);
    }
  }

  openImage(images, index) {
    var imageType;
    const image = this.getImage(images);
    var img = new Image(); 
    img.src = image; 
    var demention = img.width / img.height;
    if(demention>1.3){
      imageType = 1; //landscape
    }else{
      imageType = 0; //orientation
    }

    var array = new Array();
    var imageSlider = new Array({'url': image});
    var len = this.fetchedData.data.imageUrls.length;
    for(var i=0;i<len;i++){
      var item = this.fetchedData.data.imageUrls[i];
      const image = Object.keys(item).map(function(key) {
        return item[key]
      });
      
      array.push({'url':image});
    }

    const options: ModalOptions = {
      initialState: {
        imageSlider,
        array,
        index,
        imageType,
        id: this.queryId,
      },
      class: 'image-modal modal-xl m-0 mx-auto'
    }
    this.modalService.show(ImageModalComponent, options);
  }

  getImage(item) {
    const image = Object.keys(item).map(function(key) {
      return item[key];
    });
    return image[0];
  }

  detect(number) {
    return "left";
    // if(number%2 == 1){
    //   return "right";
    // }else{
    //   return "left";
    // }
    
  }

  openInstagram() {
    if (this.userInstagram) {
      window.open(`https://www.instagram.com/${this.userInstagram}`, '_blank');
    } else {
      this.toast.error('Have no Instagram ID');
    }
  }

  download(image: any) {
    window.open(image, '_blank');
  }

  favorite(image: object) {
      console.info('image', image, this.favs);
    var key = Object.keys(image)[0];
    if (this.getFavs(image)) {
      this.favs[key] = false;
    } else {
      this.favs[key] = true;
    }
  }
  
  getFavs(image: object): boolean {
    var key = Object.keys(image)[0];
    if(key in this.favs && this.favs[key] == true) {
      return true;
    }
    return false;
  }
 
  openShare(images) {
    const options: ModalOptions = {
      class: 'share-modal mb-0 mx-auto',
      initialState: {
        images: images,
        id: this.queryId,
      },
    }
    this.modalService.show(ShareModalComponent, options);
  }

  // modified
  downloadModal(images) {
    const options: ModalOptions = {
      class: 'download-modal mb-0 mx-auto',
      initialState: {
        images: images,
        id: this.queryId,
      },
    }
    this.modalService.show(DownloadModalComponent, options);
  }

  openPayPal() {
    if (this.username) {
      window.open(`https://www.paypal.me/${this.username}`, '_blank');
    } else {
      this.toast.error('Not found your username!');
    }
  }

  sendMessage() {
    const options: ModalOptions = {
      class: 'message-modal modal-lg mb-0 mx-auto',
    }
    this.modalService.show(MessageModalComponent, options);
  }
}
