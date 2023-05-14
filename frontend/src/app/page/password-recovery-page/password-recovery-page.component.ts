import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../shared/services/auth.service';


@Component({
  selector: 'app-password-recovery-page',
  templateUrl: './password-recovery-page.component.html',
  styleUrls: ['./password-recovery-page.component.scss']
})
export class PasswordRecoveryPageComponent {

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
      password: new FormControl(null, [Validators.required,Validators.minLength(8)]),
      verifiedСonfirmation: new FormControl(null, [Validators.required]),
    })
    this.activRout.queryParams.subscribe((params: Params) => {
      if (params['registered']) {   
      }
      else if (params['accessDenied']){}

    })
  }

  onSubmit() {
    this.form.disable()
    this.aSub = this.auth.passwordRecovery(this.form.value).subscribe(
      (data) => {
        this.router.navigate(['/login'])
      },
      error => {
        this.errorRequest=error.error.message??error
        this.form.enable()

      }
    )
  }
}
