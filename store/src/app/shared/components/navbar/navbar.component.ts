import { Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/Models/user';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() title: string = 'My Store';

  constructor(public _auth: AuthService) {}

  ngOnInit(): void {}
}
