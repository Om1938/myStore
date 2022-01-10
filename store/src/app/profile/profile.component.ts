import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Item } from '../shared/models/Items';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})
export class ProfileComponent implements OnInit {
  constructor(private router: Router) {}
  items: Item[] = [
    {
      title: 'My Orders',
      onClick: (e) => {
        console.log('My Orders clicked', e);
      },
      icon: 'receipt',
      link: [],
    },
    {
      title: 'Account Settings',
      onClick: () => {
        console.log('Account Settings clicked');
      },
      icon: 'settings',

      children: [
        {
          title: 'Profile Info',
          onClick: () => {
            console.log('Profile Info Clicked');
            this.router.navigate(['profile', 'info']);
          },
          icon: 'language',
          link: ['profile', 'info'],
        },
      ],
      link: [],
    },
    {
      title: 'My Stuff',
      onClick: () => {
        console.log('My Orders clicked');
      },
      link: [''],
    },
  ];

  ngOnInit(): void {}
}
