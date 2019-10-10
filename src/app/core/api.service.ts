import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Subject } from 'rxjs'

import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  fetch(id: number) {
    const body = {
      data: id,
    }
    return this.http.post(`${environment.apiURL}/fetchData`, JSON.stringify(body));
  }

  submit(key: string, phonenumber: string) {
    const body = {
      key: key,
      data: phonenumber,
    }
    return this.http.post(`${environment.apiURL}/submitPhoneNumber`, JSON.stringify(body));
  }

  sendSMS(phonenumber: string) {
    const twilioSID = 'ACa49d1f205e177e55fe6aab414ea36d49'
    const twilioAuth = '47260c4b4b1a6a0570765ca91b71e5fa'
    const twilioUrl = `https://api.twilio.com/2010-04-01/Accounts/${twilioSID}/Messages.json`

    let body = new URLSearchParams();
    body.set('From', '+19166192769');
    body.set('To', phonenumber);
    body.set('Body', 'Primeshot: Lucky you, your photos will be ready soon. Keep an eye out for a message to let you know when you can check them out')
    
    const basicAuth = window.btoa(twilioSID + ':' + twilioAuth);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': `Basic ${basicAuth}`,
      })
    };
    return this.http.post(twilioUrl, body.toString(), httpOptions)
  }
}
