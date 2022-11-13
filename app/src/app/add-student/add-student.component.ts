import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Student } from '../student';
import { StudentsService } from '../students.service';
import {MatDialog} from '@angular/material/dialog';
import Swal from 'sweetalert2'
@Component({
  selector: 'app-add-student',
  templateUrl: './add-student.component.html',
  styleUrls: ['./add-student.component.css'],
})
export class AddStudentComponent implements OnInit {
  studentForm: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    gender: 'Male',
    age: 0,
  };
 
  constructor(
    private studentService: StudentsService,
    private router: Router,
    private dialog: MatDialog
  ) {}
 
  ngOnInit(): void {}
 
  create() {
    this.studentService.create(this.studentForm).subscribe(() => {
      // redirect to home page
      this.router.navigate(['/']);
      Swal.fire(
        'Good job!',
        'You created a new user!',
        'success'
      )
    });
  }
}