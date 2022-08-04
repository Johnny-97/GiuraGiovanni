import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { GoRestUser } from 'src/app/interfaces';

@Component({
  selector: 'gg-add-user-modal',
  templateUrl: './add-user-modal.component.html',
  styleUrls: ['./add-user-modal.component.less']
})
export class AddUserModalComponent{

  constructor(private ref: DynamicDialogRef, private fb: FormBuilder) { }

  form = this.fb.nonNullable.group({
    name: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
    gender: [false],
    status: [false]
  });

  get name(){
    return this.form.controls['name'];
  }

  get email(){
    return this.form.controls['email'];
  }

  get gender(){
    return this.form.controls['gender'];
  }

  get status(){
    return this.form.controls['status'];
  }

  addUser(){
    let body = {
      ...this.form.value,
      gender: this.gender.value? 'male': 'female',
      status: this.status.value? 'active': 'inactive',
    };
    this.ref.close(body);
  }

  abort(){
    this.ref.close();
  }
}
