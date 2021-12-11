import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private readonly _auth: AuthService,
    private readonly _router: Router
  ) {
    this.registerForm = _fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required]],
      cnfPassword: ['', [Validators.required]],
      mobile: ['', []],
    });
  }

  register() {
    if (!this.registerForm.valid) return;
    this._auth.register(this.registerForm.value).subscribe((res) => {
      this._router.navigate(['']);
    });
    this.registerForm.reset();
  }

  ngOnInit(): void {
    this._auth.logout();
  }
}
