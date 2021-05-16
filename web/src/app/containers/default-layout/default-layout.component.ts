import {Component} from '@angular/core';
import { navItems } from '../../_nav';
import {Router} from "@angular/router"

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  public sidebarMinimized = false;
  public navItems = navItems;
  profilePhoto='assets/img/avatars/7.jpg'
  userId
  constructor(private router: Router)
  {
    this.userId=localStorage.getItem('userId')
    this.profilePhoto=localStorage.getItem('profilePhoto')
  }
  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  logout()
  {
    localStorage.setItem('userId',"");
  }

  goToProfile()
  {
    this.router.navigate(['home','admin',this.userId,'edit'])
  }
}
