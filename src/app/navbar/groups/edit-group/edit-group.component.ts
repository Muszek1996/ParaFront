import { Component, OnInit } from '@angular/core';
import {Group} from '../../../_models/group';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GroupService} from '../../../_services/group.service';
import {first} from 'rxjs/operators';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {

  group: Group;
  constructor(private formBuilder: FormBuilder, private router: Router, private groupService: GroupService) { }

  // convenience getter for easy access to form fields
  get f() { return this.editForm.controls; }

  editForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';


  ngOnInit() {
    const group = JSON.parse(localStorage.getItem('editGroup'));
    if (!group) {
      alert('Invalid action.');
      this.router.navigate(['list-group']);
      return;
    }
    this.editForm = this.formBuilder.group({
      id: [group.id],
      email: [group.email, [Validators.required, Validators.email]],
      name: [group.name, [Validators.minLength(3), Validators.maxLength(15)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      role: [group.role, Validators.required]
    });
  }

  onSubmit() {
    this.submitted = true;


    const group = JSON.parse(localStorage.getItem('editGroup'));
    console.log(group);

    this.groupService.updateGroup(this.editForm.value, group._id)
      .pipe(first())
      .subscribe(
        data => {
          this.router.navigate(['/list-group']);
        },
        error => {
          console.log(error);
          this.error = error;
          this.loading = false;
        });
  }

}
