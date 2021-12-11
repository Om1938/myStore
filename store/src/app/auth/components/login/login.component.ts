import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private readonly _auth: AuthService,
    private _router: Router
  ) {
    this.loginForm = _fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  login() {
    if (!this.loginForm.valid) return;

    this._auth.login(this.loginForm.value).subscribe((res) => {
      this._router.navigate(['']);
    });
    this.loginForm.reset();
  }
  ngOnInit(): void {
    this._auth.logout();
  }
}
