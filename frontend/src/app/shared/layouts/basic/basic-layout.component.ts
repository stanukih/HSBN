import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-basic-layout',
  templateUrl: './basic-layout.component.html',
  styleUrls: ['./basic-layout.component.scss']
})
export class BasicLayoutComponent {
  authorizedUser:boolean=this.auth.getToken()?true:false
  constructor (private auth: AuthService){}
  logout(){
    this.auth.logout()
  }
}
