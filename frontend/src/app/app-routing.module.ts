import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout-component/auth-layout.component';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';
import { ConfirmationPageComponent } from './page/confirmation-page/confirmation-page.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { PasswordRecoveryRequestPageComponent } from './page/password-recovery-request-page/password-recovery-request-page.component';
import { PasswordRecoveryPageComponent } from './page/password-recovery-page/password-recovery-page.component';
import { TermsOfUsePageComponent } from './page/terms-of-use-page/terms-of-use-page.component';
import { LoadStantionsPackPageComponent } from './page/loading-stantions-pack-page/load-stantions-pack-page.component';
import { LoadTravelsPackPageComponent } from './page/loading-travels-pack-page/load-travels-pack-page.component';
import { StationsListComponent } from './page/stations-list/stations-list.component';
import { TravelListComponent } from './page/travel-list/travel-list.component';
import { StantionComponent } from './page/stantion/stantion.component';
import { BasicLayoutComponent } from './shared/layouts/basic/basic-layout.component';
import { AuthGuard } from './shared/classes/auth.guard';
import { ErrorListComponent } from './page/error-list/error-list.component';

const routes: Routes = [
  {
    path: "", component: AuthLayoutComponent, children: [
      {
        path: "", redirectTo: "/landing", pathMatch: "full"
      },
      {
        path: "login", component: LoginPageComponent,
      },
      {
        path: "registration", component: RegistrationPageComponent,
      },
      {
        path: "confirmationCode", component: ConfirmationPageComponent,
      },
      {
        path: "passwordRecoveryRequest", component: PasswordRecoveryRequestPageComponent,
      },
      {
        path: "passwordRecovery", component: PasswordRecoveryPageComponent,
      }
    ]
  },
  {
    path: "", component: BasicLayoutComponent, children: [
      { 
        path: "landing", component: LandingPageComponent 
      },
      { 
        path: "list_stantions", component: StationsListComponent 
      },
      { 
        path: "list_travels", component: TravelListComponent 
      },      
      {
         path: "list_errors", canActivate:[AuthGuard], component: ErrorListComponent
       },
      { 
        path: "stantion", component: StantionComponent 
      },
      { 
        path: "terms_of_use", component: TermsOfUsePageComponent 
      },
      {
        path: "loadStantionsPack", canActivate:[AuthGuard], component: LoadStantionsPackPageComponent
      },
      {
        path: "loadTravelsPack", canActivate:[AuthGuard], component: LoadTravelsPackPageComponent
      }
    ]
  },
  {
    path:"**", redirectTo: "/landing", pathMatch: "full"
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
