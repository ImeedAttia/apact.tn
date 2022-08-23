import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { initializeApp,provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth,getAuth } from '@angular/fire/auth';
import { provideFirestore,getFirestore } from '@angular/fire/firestore';
import { HomePageComponent } from './components/entry/home-page/home-page.component';
import { AboutUsComponent } from './components/entry/about-us/about-us.component';
import { NavBarComponent } from './components/nav-footer/nav-bar/nav-bar.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { LoginComponent } from './components/user/login/login.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SendPasswordResetComponent } from './components/user/send-password-reset/send-password-reset.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialModule } from './material.module';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS } from '@angular/material/snack-bar';
import { ErrorStateMatcher, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { FooterComponent } from './components/nav-footer/footer/footer.component';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    AboutUsComponent,
    NavBarComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent,
    SendPasswordResetComponent,
    FooterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
    NgxSpinnerModule,
    BrowserAnimationsModule
  ],
  providers: [
    DataService,
    UserService,
    {provide: MAT_SNACK_BAR_DEFAULT_OPTIONS, useValue: {duration: 3500}},
    {provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
