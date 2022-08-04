import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { GoRestService } from 'src/app/services';

@Component({
  selector: 'gg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  bearer = new FormControl('', [Validators.required, Validators.minLength(12)]);

  constructor(title: Title, private gorest: GoRestService, private message: MessageService, private router: Router) {
    title.setTitle('Login');
  }

  test(){

    localStorage.setItem('BEARER', this.bearer.value!);
    //verifico la validità del token provando ad aggiungere un utente vuoto
    //se go rest risponde con un 401 unauthorized vuol dire che il token non è corretto
    //altrimenti memorizzo il token per i login successivi
    this.gorest.postUser({}).subscribe(res=>{
      if(res.code === 401){
        this.bearer.setValue('');
        this.message.add({
          severity: 'error',
          summary: 'Errore',
          detail: 'La chiave fornita non è valida',
        });
        localStorage.removeItem('BEARER');
      }else{
        this.message.add({
          severity: 'success',
          summary: 'Successo',
          detail: `La chiave fornita è valida. Sarai reindirizzato alla home tra qualche secondo`,
        });
        setTimeout(()=>{
          this.router.navigateByUrl('/home');
        }, 3000);
      }
    });
  }

}
