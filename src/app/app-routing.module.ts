import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutUsComponent } from './components/entry/about-us/about-us.component';
import { HomePageComponent } from './components/entry/home-page/home-page.component';
import { LoginComponent } from './components/user/login/login.component';
import { ProfileComponent } from './components/user/profile/profile.component';
import { RegisterComponent } from './components/user/register/register.component';
import { SendPasswordResetComponent } from './components/user/send-password-reset/send-password-reset.component';
import { AuthGuard } from './guards/auth.guard';
import { SecureInnerPagesGuard } from './guards/secure-inner-pages.guard';

const routes: Routes = [
  {
    path:'login', component: LoginComponent, canActivate: [SecureInnerPagesGuard]
  },
  {
    path:'profile', component: ProfileComponent, canActivate: [AuthGuard]
  },
  {
    path:'aboutus', component: AboutUsComponent
  },
  {
    path:'sendpasswrodrest', component: SendPasswordResetComponent, canActivate: [SecureInnerPagesGuard]
  },
  {
    path:'register', component: RegisterComponent, canActivate: [SecureInnerPagesGuard]
  },
  {
    path:'home', component: HomePageComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
