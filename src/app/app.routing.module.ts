import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginPageComponent } from './login-page/login-page.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AddTaskPageComponent } from './add-task-page/add-task-page.component';
import { EditTaskPageComponent } from './edit-task-page/edit-task-page.component';
import { DirectoriesPageComponent } from './directories-page/directories-page.component';

const routes: Routes = [
  { path: 'tasks', component: HomePageComponent },
  { path: 'login', component: LoginPageComponent },
  { path: 'signup', component: RegisterPageComponent },
  { path: 'tasks/add', component: AddTaskPageComponent },
  { path: 'directories', component: DirectoriesPageComponent },
  { path: 'tasks/edit/:id', component: EditTaskPageComponent },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }