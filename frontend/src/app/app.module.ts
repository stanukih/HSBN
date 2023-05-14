import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {MatInputModule} from '@angular/material/input'
import {MatStepperModule} from "@angular/material/stepper"
import {MatFormFieldModule} from "@angular/material/form-field"
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { LoginPageComponent } from './page/login-page/login-page.component';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterseptor } from './shared/classes/token.interseptor';
import { RouterModule } from '@angular/router';
import { AuthLayoutComponent } from './shared/layouts/auth-layout-component/auth-layout.component';
import { RegistrationPageComponent } from './page/registration-page/registration-page.component';
import { PasswordRecoveryPageComponent } from './page/password-recovery-page/password-recovery-page.component';
import { ConfirmationPageComponent } from './page/confirmation-page/confirmation-page.component';
import { LandingPageComponent } from './page/landing-page/landing-page.component';
import { PasswordRecoveryRequestPageComponent } from './page/password-recovery-request-page/password-recovery-request-page.component'
import { MediaService } from './shared/services/media';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatListModule} from '@angular/material/list';

import { OpencookiesAgreementNotificationComponent } from './opencookies-agreement-notification/opencookies-agreement-notification.component';
import { TermsOfUsePageComponent } from './page/terms-of-use-page/terms-of-use-page.component';
import { LoadStantionsPackPageComponent } from './page/loading-stantions-pack-page/load-stantions-pack-page.component';
import { LoadTravelsPackPageComponent } from './page/loading-travels-pack-page/load-travels-pack-page.component';
import { StationsListComponent } from './page/stations-list/stations-list.component';
import {FileLoaderComponent} from './component/file-loader/file-loader.component';
import {MatPaginatorModule} from '@angular/material/paginator'
import { MatTableModule } from '@angular/material/table'
import { MatExpansionModule } from '@angular/material/expansion'
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import { TravelListComponent } from './page/travel-list/travel-list.component';
import { StantionComponent } from './page/stantion/stantion.component';
import { MapComponent } from './component/hsb-map/hsb-map.component';
import { BasicLayoutComponent } from './shared/layouts/basic/basic-layout.component';
import { ErrorListComponent } from './page/error-list/error-list.component';

@NgModule({
  declarations: [
    FileLoaderComponent,
    AppComponent,
    LoginPageComponent,
    AuthLayoutComponent,
    RegistrationPageComponent,
    PasswordRecoveryPageComponent,
    ConfirmationPageComponent,
    LandingPageComponent,
    PasswordRecoveryRequestPageComponent,
    OpencookiesAgreementNotificationComponent,
    TermsOfUsePageComponent,
    LoadStantionsPackPageComponent,
    LoadTravelsPackPageComponent,
    StationsListComponent,
    TravelListComponent,
    StantionComponent,
    MapComponent,
    BasicLayoutComponent,
    ErrorListComponent
  ],
  imports: [    
    MatAutocompleteModule,
    MatSidenavModule,   
    MatExpansionModule,
    MatTableModule,
    MatPaginatorModule,
    MatListModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatIconModule,
    MatMenuModule,
    RouterModule,
    MatButtonModule,
    MatCardModule,
    MatTabsModule,
    MatSelectModule,
    MatInputModule,
    FormsModule, 
    ReactiveFormsModule,
    MatFormFieldModule,
    MatStepperModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi:true,
    useClass:TokenInterseptor
  }, MediaService],
  bootstrap: [AppComponent]
})
export class AppModule { }
