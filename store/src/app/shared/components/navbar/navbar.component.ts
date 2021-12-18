import { Router } from '@angular/router';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { User } from 'src/app/auth/Models/user';
import { AuthService } from 'src/app/auth/services/auth.service';
import { MediaMatcher } from '@angular/cdk/layout';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  @Input() title: string = 'My Store';
  @Input() showCart: boolean = true;

  mobileQuery: MediaQueryList;
  _mobileQueryListener: () => any;

  constructor(
    public _auth: AuthService,
    private readonly media: MediaMatcher,
    public _router: Router,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {
    this.mobileQuery = this.media.matchMedia('(max-width: 1000px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    // tslint:disable-next-line: deprecation
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit(): void {}
}
