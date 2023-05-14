import { Component, EventEmitter, Output, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../shared/services/auth.service';
import { MatSnackBarRef } from '@angular/material/snack-bar';

@Component({
  selector: 'app-opencookies-agreement-notification',
  templateUrl: './opencookies-agreement-notification.component.html',
  styleUrls: ['./opencookies-agreement-notification.component.scss']
})
export class OpencookiesAgreementNotificationComponent {

  snackBarRef = inject(MatSnackBarRef);
  durationInSeconds = 0;
  constructor(private router: Router, private activRout: ActivatedRoute, private auth:AuthService) {}
  agreement(){
    this.auth.cookiesAgreement()    
    this.snackBarRef.dismiss()
  }
  termsOfUse(){
    this.router.navigate(['terms_of_use'])
  }

}
