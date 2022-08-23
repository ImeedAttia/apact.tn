import { Component } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { filter, map } from 'rxjs';
import {Event} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'apact';


  constructor(public router: Router,private  spinner : NgxSpinnerService) {
    router.events.pipe(
      filter((e: Event): e is RouterEvent => e instanceof RouterEvent)
   ).subscribe(
    (e: RouterEvent) => {
      this.show();
      filter(
        (e) =>
          e instanceof NavigationStart ||
          e instanceof NavigationEnd ||
          e instanceof NavigationCancel ||
          e instanceof NavigationError
      ),
      map((e) => e instanceof NavigationStart)

      if(NavigationEnd){
        this.spinner.hide()
      }
    },(error) => {
      this.spinner.hide()

    },() => {
      this.spinner.hide()
    }
  )


  }

  ngOnInit() {

  }
  show(){

      this.spinner.show();

    setTimeout(() => {
      /** spinner ends after 5 seconds */
      this.spinner.hide();
    }, 1000);

  }
}
