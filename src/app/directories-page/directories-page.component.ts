import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService } from '../_services/task.service';
@Component({
  selector: 'app-directories-page',
  templateUrl: './directories-page.component.html',
  styleUrls: ['./directories-page.component.css']
})
export class DirectoriesPageComponent implements OnInit {
  directoriesList: Array<any> = [];
  allTasks: Array<any> = [];
  currentDirectoryTasks: Array<any> = [];
  currentDirectory;
  interval: any;

  constructor(private taskService: TaskService, private changeDetection: ChangeDetectorRef, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.refresh();
    this.interval = setInterval(() => {
      this.refresh();
    }, 60000);
  }

  refresh() {
    this.getUserDirectories();
    this.getUserTasks();
  }

  getUserDirectories() {
    this.taskService.getUserDirectories().subscribe(
      data => {
        console.log(data);
        this.directoriesList = data;
        this.changeDetection.detectChanges();
      },
      err => {
        console.log("oops", err);
      });
  }

  getUserTasks() {
    this.taskService.getUserTasks().subscribe(
      data => {
        this.allTasks = data;
        console.log(this.allTasks);
      },
      err => {
        console.log("oops", err);
      });
  }
  setCurrentDirectory(directoryId: number) {
    this.currentDirectoryTasks = [];
    for (let task of this.allTasks) {
      console.log(task);
      if (task.directory) {
        if (task.directory.id == directoryId) {
          this.currentDirectoryTasks.push(task);
        }
      }
    }
  }
  deleteDirectory(directoryId: number, directoryName: string) {
    if (confirm("Are you sure to delete directory with header -  " + directoryName)) {
      this.taskService.deleteDirectory(directoryId).subscribe(
        data => {
          this.refresh();
          this.changeDetection.detectChanges();
          this.openSnackBar("Selected directory was deleted", "Confirm");
        },
        err => {
          console.log("oops", err);
        });
    }
  }
  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action);
  }
}
