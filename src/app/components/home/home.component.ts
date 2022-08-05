import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import {
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { GoRestResponse, GoRestUser } from 'src/app/interfaces';
import { GoRestService } from 'src/app/services/go-rest.service';
import { AddUserModalComponent } from '../add-user-modal/add-user-modal.component';

@Component({
  selector: 'gg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent implements OnInit {
  users$?: Observable<GoRestUser[]>;
  filteredUsers$?: Observable<GoRestUser[]>;
  columns: Column[] = [
    {
      label: 'Nome',
      transform: (a) => a.name!,
    },
    {
      label: 'E-Mail',
      transform: (a) => a.email!,
    },
    {
      label: 'Sesso',
      transform: (a) => (a.gender === 'male' ? 'Uomo' : 'Donna'),
    },
    {
      label: 'Attivo',
      transform: (a) => (a.status === 'active' ? 'Si' : 'No'),
    },
  ];

  search = new FormControl('', { nonNullable: true });

  constructor(
    private rest: GoRestService,
    private message: MessageService,
    private dialog: DialogService,
    private confirm: ConfirmationService,
    title: Title
  ) {
    title.setTitle('Home Page');
  }

  ngOnInit(): void {
    this.users$ = this.rest.getUsers().pipe(map((res) => res.data));

    this.search.valueChanges
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        map((search) => search.toLowerCase())
      )
      .subscribe((search) => {
        this.filteredUsers$ = this.users$?.pipe(
          map((users) =>
            users.filter(
              (user) =>
                user.email?.toLowerCase().includes(search) ||
                user.name?.toLowerCase().includes(search)
            )
          )
        );
      });
    this.filteredUsers$ = this.users$;
  }

  delete(event: Event, user: GoRestUser) {
    this.confirm.confirm({
      target: event.target!,
      message: 'Sei sicuro di voler procedere? Questa azione è irreversibile',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.rest
          .deleteUser(user)
          .pipe(
            tap(() => {
              this.users$ = this.rest.getUsers().pipe(map((res) => res.data));
              this.search.setValue('');
            })
          )
          .subscribe();
      },
    });
  }

  openModal() {
    this.dialog
      .open(AddUserModalComponent, {
        header: 'Aggiungi utente',
        width: '80%',
        contentStyle: { 'max-height': '70vh', overflow: 'auto' },
        baseZIndex: 2,
      })
      .onClose.pipe(
        switchMap((user: GoRestUser) => {
          if (user) {
            return this.rest.postUser(user);
          } else {
            return of({
              code: 404,
            } as GoRestResponse<any>);
          }
        }),
        map((res) => {
          if (res.code !== 404) {
            if (res.code === 422) {
              this.message.add({
                severity: 'error',
                summary: 'Errore',
                detail: 'Email ' + res.data[0].message,
              });
            } else {
              this.message.add({
                severity: 'success',
                summary: 'Successo',
                detail: 'Utente aggiunto con successo',
              });
              this.users$ = this.rest
                .getUsers()
                .pipe(map((response) => response.data));
            }
          }
        })
      )
      .subscribe();
  }
}

interface Column {
  label: string;
  transform: (a: GoRestUser) => string;
}
