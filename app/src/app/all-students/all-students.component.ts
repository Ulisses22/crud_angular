import { Student } from '../student';
import { StudentsService } from '../students.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteDialogStudentComponent } from '../delete-dialog-student/delete-dialog-student.component';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { Subject, takeUntil } from 'rxjs';
import { Component, OnInit, ViewChild } from '@angular/core';


 
@Component({
  selector: 'app-all-students',
  templateUrl: './all-students.component.html',
  styleUrls: ['./all-students.component.css'],
})
export class AllStudentsComponent implements OnInit {
  allStudentsSource: Student[] = [];
  displayedColumns: string[] = [
    'id',
    'firstName',
    'gender',
    'lastName',
    'age',
    'actions',
  ];
  dataSource!: MatTableDataSource<Student>
  changeDetectorRefs: any;

  constructor(
    private studentService: StudentsService,
    public dialog: MatDialog,

  ) {}
  @ViewChild(MatSort, { static: true }) sort: MatSort = new MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  destroy$: Subject<boolean> = new Subject<boolean>();

  ngOnInit(): void {
    this.get();
  }
  ngOnDestroy() {

  }

  get() {
    this.studentService.get().pipe(takeUntil(this.destroy$)).subscribe((data)=>{
      this.allStudentsSource = data

      // paginator
      this.dataSource = new MatTableDataSource(this.allStudentsSource)
      this.dataSource.sort = this.sort
      this.dataSource.paginator = this.paginator
      
    })
  }
 
  openDeleteModal(id: number) {
    const dialogRef = this.dialog.open(DeleteDialogStudentComponent, {
      width: '250px',
      data: { id },
    });
 
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.dataSource.data = this.dataSource.data.filter(
          (u) => u.id !== id
        );  
      }
    });
  }


  applyFilter(event: any) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
