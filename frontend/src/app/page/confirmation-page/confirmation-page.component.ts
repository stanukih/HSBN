import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';



@Component({
  selector: 'app-confirmation-page',
  templateUrl: './confirmation-page.component.html',
  styleUrls: ['./confirmation-page.component.scss']
})
export class ConfirmationPageComponent {



  constructor(private router: Router, private activRout: ActivatedRoute, private auth: AuthService) { }

  form!: FormGroup
  aSub!: Subscription
  errorRequest:any=null

  ngOnDestroy(): void {
    if (this.aSub) {
      this.aSub.unsubscribe()
    }
  }


  ngOnInit() {
    this.form = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      verifiedСonfirmation: new FormControl(),
    })
    this.activRout.queryParams.subscribe((params: Params) => {
      if (params['registered']) {
        //Вы уже авторизованы        
      }
      else if (params['accessDenied']){}

    })
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.confirmation(this.form.value).subscribe(
      (data) => {
        console.log(data)
        this.router.navigate(['/login'])
      },
      error => {
        this.errorRequest=error.error.message??error
        this.form.enable()

      }
    )
  }
}
