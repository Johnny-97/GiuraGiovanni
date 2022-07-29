import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent, NotFoundComponent } from './components';

const routes: Routes = [
  {
  path: 'home',
  component: HomeComponent
  },
  { path: '', redirectTo: '/home', pathMatch: "full"},
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
