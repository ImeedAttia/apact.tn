import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {


//Declaration
  //Path of logo img
  LogoImgPath="../../../assets/logo.png"
  // User Status
  isLoggedIn : boolean = false;
  //usr data
  userData : any ={};
  constructor(private authService: AuthService) { }


  ngOnInit(): void {
    this.isLoggedIn = !!this.authService.getAuthLocal();
    this.refreshProfile();
  }

  refreshProfile(){
    this.userData = this.authService.getAuthLocal();

    this.userData = {
      "displayName" : this.userData.displayName ? this.authService.getAuthLocal().displayName : "",
      "photoURL" : this.userData.providerData[0].photoURL ? this.userData.providerData[0].photoURL :   "https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
    }
}
  //Method to logout
  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
  }


}
