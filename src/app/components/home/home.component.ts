import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { GoRestService } from 'src/app/services/go-rest.service';

@Component({
  selector: 'gg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  users?: any;

  constructor(private rest: GoRestService, private message: MessageService) { }

  ngOnInit(): void {
    this.rest.getUsers().subscribe(res=>{
      this.users=res;
    });
  }

  post(){
    this.rest.postUser({
      name: 'Giovanni',
      gender:'Male',
      email: 'giurag.d@gmail.com',
      status: 'Active'
    }).subscribe(res=>{
      if(res.code === 422){
        this.message.add({severity:'error', summary: 'Errore', detail: 'Email '+res.data[0].message});
      }else{
        this.message.add({severity:'success', summary: 'Successo', detail: 'Utente aggiunto con successo'});
      }
    });
  }

}
