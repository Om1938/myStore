import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { User } from '../Models/user';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  authURL = environment.server + 'auth';

  user = new BehaviorSubject<User | null>(null);
  token: string | undefined;

  constructor(private _http: HttpClient) {}

  register(registerData: any) {
    return this._http.post(this.authURL, registerData);
  }

  login(loginData: any) {
    return this._http.post(`${this.authURL}/login`, loginData).pipe(
      tap((res: any) => {
        if (!res.token) return;
        this.user.next(res.user);
        this.token = res.token;
        localStorage.setItem('token', res.token);
      })
    );
  }

  autoLogin() {
    let token = localStorage.getItem('token');
    if (!token) return;
    this.token = token;
    this.getProfile();
  }
  logout() {
    localStorage.removeItem('token');
    this.token = undefined;
    this.user.next(null);
  }
  getProfile() {
    this._http.get(this.authURL).subscribe((res: any) => {
      this.user.next(res.user);
    });
  }
}
