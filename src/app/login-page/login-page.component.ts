import { HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../_services/auth.service';
import { SignalRService } from '../_services/signal-r.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';

  constructor(private signalR : SignalRService, private authService: AuthService, private tokenStorage: TokenStorageService) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorage.saveToken(data.access_token);
        this.getUser();

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.signalR.startConnection();
        this.reloadPage();
      },
      err => {
        console.log('oops', err)
        this.errorMessage = err.error.error_description;
        this.isLoginFailed = true;
      }
    );
  }

  getUser(): any {
    this.authService.getUser().subscribe(
      data => {
        this.tokenStorage.saveUser(data);
        localStorage.setItem("user", data.email);

      },
      err => {
        console.log("oops", err);
      });
  }
  reloadPage(): void {
    window.location.reload();
  }
}