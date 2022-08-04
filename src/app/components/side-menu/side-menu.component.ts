import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent  {

  isLogged:boolean;

  items: MenuItem[] = [
    {
      label: 'Home',
      link: '/home',
      icon: 'pi pi-home'
    },
    {
      label: 'Post pubblicati',
      link: '/posts',
      icon: 'pi pi-users'
    },
    {
      label: 'Utenti registrati',
      link: '/users',
      icon: 'pi pi-pencil'
    },
  ];

  constructor(private confirm: ConfirmationService, private router: Router) {
    this.isLogged= !!localStorage.getItem('BEARER');
  }

  logout(){
    this.confirm.confirm({
      message: 'Sei sicuro di voler procedere?',
      header: 'Conferma',
      icon: 'pi pi-exclamation-triangle',
      accept:()=>{
        localStorage.removeItem('BEARER');
        this.router.navigateByUrl('/login');
      }
    });
  }
}

interface MenuItem{
  label: string;
  link: string;
  icon: string;
}