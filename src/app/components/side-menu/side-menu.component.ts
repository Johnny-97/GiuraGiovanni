import { Component } from '@angular/core';

@Component({
  selector: 'side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.less']
})
export class SideMenuComponent  {

  items: MenuItem[] = [
    {
      label: 'Home',
      link: '/home',
      icon: 'pi pi-home'
    },
    {
      label: 'Registrazione',
      link: '/signup',
      icon: 'pi pi-users'
    },
    {
      label: 'Utenti registrati',
      link: '/users',
      icon: 'pi pi-pencil'
    },
  ];

  constructor() { }

}

interface MenuItem{
  label: string;
  link: string;
  icon: string;
}