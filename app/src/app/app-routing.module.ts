import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


// Routes
import { AllStudentsComponent } from './all-students/all-students.component';
import { AddStudentComponent } from './add-student/add-student.component'
import { EditStudentComponent } from './edit-student/edit-student.component';
import { DeleteDialogStudentComponent } from './delete-dialog-student/delete-dialog-student.component';

const routes: Routes = [
  {
    path: '',
    component: AllStudentsComponent
  },
  {
    path: 'add-student',
    component: AddStudentComponent
  },
  {
    path: 'edit-student/:id',
    component: EditStudentComponent
  },
  {
    path: 'delete-student/:id',
    component: DeleteDialogStudentComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
