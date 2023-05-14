import { Component, EventEmitter, OnInit } from '@angular/core';
import { AuthService } from './shared/services/auth.service';
import { MatSnackBar, MatSnackBarRef } from '@angular/material/snack-bar';
import { OpencookiesAgreementNotificationComponent } from './opencookies-agreement-notification/opencookies-agreement-notification.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{  
  myEvent = new EventEmitter();
  cookiesNotificationComponentRef?:MatSnackBarRef<OpencookiesAgreementNotificationComponent>
  constructor(private auth:AuthService, private cookiesAgreementNotification: MatSnackBar){

  }
  ngOnInit(): void {
    const potentialToken = localStorage.getItem("auth-token")
    if (potentialToken!==null&&(JSON.parse(atob(potentialToken.split('.')[1]).toString()))) {
      this.auth.setToken(potentialToken)
    }
    if (!this.auth.isCookieNotification()){
      this.opencookiesAgreementNotification()
    }
  }
  opencookiesAgreementNotification() {
    this.cookiesNotificationComponentRef=this.cookiesAgreementNotification.openFromComponent(OpencookiesAgreementNotificationComponent,{duration:0})        
  }

}
