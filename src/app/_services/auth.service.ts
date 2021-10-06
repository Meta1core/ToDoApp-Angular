import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from './token-storage.service';

const API = 'http://10.190.101.110:8080/';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  login(username: string, password: string): Observable<any> {
    let httpOptionsForLogin = {
      headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
    };
    let model = "username=" + username + "&password=" + password + "&grant_type=" + "password";
    return this.http.post(API + 'token', model, httpOptionsForLogin);;
  }

  getUser(): Observable<any> {
    let headersWithToken = new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
      'Accept': 'application/json',
      'Authorization': `Bearer ${this.tokenStorage.getToken()}`,
    })
    return this.http.get(API + "api/user/info", { headers: headersWithToken });
  }

  register(email: string, confirmPassword: string, password: string): Observable<any> {
    let httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http.post(API + 'api/user/register', {
      email,
      password,
      confirmPassword
    }, httpOptions);
  }
}
