import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {GroupService} from '../../../_services/group.service';

@Component({
  selector: 'app-add-group',
  templateUrl: './add-group.component.html',
  styleUrls: ['./add-group.component.css']
})
export class AddGroupComponent implements OnInit {

  addForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  error = '';

  // convenience getter for easy access to form fields
  get f() { return this.addForm.controls; }

  constructor(private formBuilder: FormBuilder, private router: Router, private groupService: GroupService) {
  }

  ngOnInit() {
    console.log(localStorage.getItem('currentGroup'));
    const user = JSON.parse(localStorage.getItem('currentUser'));
    this.addForm = this.formBuilder.group({
      _id: [],
      owner: [user.id],
      name: ['', [Validators.minLength(3), Validators.maxLength(15)]],
    });

  }

  onSubmit() {
    this.submitted = true;

    if (this.addForm.invalid) {
      return;
    }

    this.groupService.addGroup(this.addForm.value)
      .subscribe(data => {
          this.router.navigate(['/list-group']);
        },
        error => {
          console.log(error);
          this.error = error;
          this.loading = false;
        });
  }

}
