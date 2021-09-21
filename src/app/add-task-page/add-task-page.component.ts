import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../_services/task.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Task } from '../model/Task';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { DialogOverviewExampleDialog } from '../dialog-form-add-directory/DialogOverviewExampleDialog';
import { MatSnackBar } from '@angular/material/snack-bar';


export function FormatString(maxLength: number, inputString: string, finalString) {
  if (inputString.length > maxLength) {
    return finalString.concat(inputString.substring(0, maxLength), "\n", inputString.substring(maxLength, inputString.length))
  }
  else return inputString;
}
export interface DialogData {
  directoryName: string;
}


@Component({
  selector: 'app-add-task-page',
  templateUrl: './add-task-page.component.html',
  styleUrls: ['./add-task-page.component.css']
})
export class AddTaskPageComponent implements OnInit {

  constructor(private taskService: TaskService, private router: Router, private formBuilder: FormBuilder, public dialog: MatDialog, private snackBar: MatSnackBar) { }
  date = null;
  task: Task = new Task("", "", this.date, 0);
  directoriesList: Array<any> = [];
  form: FormGroup = this.formBuilder.group({
    header: [null, Validators.required],
    description: [null, Validators.required],
  });
  directoryName: string = "";
  isEditMode: boolean = false;

  ngOnInit(): void {
    this.getUserDirectories();
  }

  onSubmit() {
    console.log(this.task);
    this.task.description = FormatString(40, this.task.description, "");
    this.taskService.addTask(this.task).subscribe(
      data => {
        console.log(data);
        this.returnToTaskPage();
      },
      err => {
        console.log("oops", err);
      });
  }

  returnToTaskPage() {
    this.router.navigate(['/tasks']);
  }

  getUserDirectories() {
    this.taskService.getUserDirectories().subscribe(
      data => {
        console.log(data);
        this.directoriesList = data;
      },
      err => {
        console.log("oops", err);
      });
  }

  selectDirectory(directory_Id: number) {
    this.task.directory_Id = directory_Id;
  }

  createDirectory(directory: string) {
    if (directory.length > 7) {
      this.openSnackBar("Length shoud be less or 6 symbols", "Confirm");
      return;
    }
    if (this.directoriesList.length > 4) {
      this.openSnackBar("The maximum number of directories - 5", "Confirm");
      return;
    }
    this.taskService.addDirectory(directory).subscribe(
      data => {
        this.dialog.closeAll();
        this.getUserDirectories();
      },
      err => {
        console.log("oops", err);
      });
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogOverviewExampleDialog, {
      width: '250px',
      data: { directoryName: this.directoryName }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.directoryName = result;
      this.createDirectory(result);
    });
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}