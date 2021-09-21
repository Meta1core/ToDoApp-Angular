import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';
import { Task } from '../model/Task';

import { timer } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

const API = 'https://localhost:44370/api/';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  headersWithToken = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' + this.tokenStorage.getToken()
  });

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }


  getUserTasks(): Observable<any> {
    return this.http.get(API + 'tasks', { headers: this.headersWithToken });
  }

  getOverdueTasks(): Observable<any> {
    return this.http.get(API + 'tasks/overdue', { headers: this.headersWithToken });
  }

  getCompletedTasks(): Observable<any> {
    return this.http.get(API + 'tasks/completed', { headers: this.headersWithToken });
  }
  getFavoriteTasks(): Observable<any> {
    return this.http.get(API + 'tasks/favorite', { headers: this.headersWithToken });
  }
  getTaskById(id: number): Observable<any> {
    return this.http.get(API + 'tasks/' + id, { headers: this.headersWithToken });
  }

  addTask(task: Task): Observable<any> {
    return this.http.post(API + 'tasks', task, { headers: this.headersWithToken });
  }

  getUserDirectories(): Observable<any> {
    return this.http.get(API + 'directory', { headers: this.headersWithToken });
  }

  updateTask(task: Task): Observable<any> {
    return timer(2000).pipe(
      mergeMap(() => this.http.put(API + 'tasks', task, { headers: this.headersWithToken }))
    );
  }

  addDirectory(directoryName: string) {
    console.log(directoryName);
    return this.http.post(API + 'directory', { directoryName }, { headers: this.headersWithToken });
  }

  deleteTask(task_Id: number): Observable<any> {
    return timer(2000).pipe(
      mergeMap(() => this.http.delete(API + 'tasks/' + task_Id, { headers: this.headersWithToken }))
    );
  }
  deleteDirectory(directory_id: number): Observable<any> {
    return timer(2000).pipe(
      mergeMap(() => this.http.delete(API + 'directory/' + directory_id, { headers: this.headersWithToken }))
    );
  }
}
