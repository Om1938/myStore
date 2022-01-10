import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRoute,
  Event,
  NavigationStart,
  Router,
} from '@angular/router';
import { Subscription } from 'rxjs';
import { Item } from '../../models/Items';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() items: Item[] = [];
  @Input() isChild: boolean = false;
  x!: Subscription;

  currentRoute :string = ''
  link: string[] = [];
  constructor(private _route: Router) {}


  ngOnInit(): void {
    this.x = this._route.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.link = event.url.split('/').filter(u=>u != '/');
      }
    });
  }

  IsItemActive(item:Item){

    return item.link.join() == this.link.join()
  }

  clickItem(e: any, item: Item) {
    if (item.onClick) item.onClick(e);
  }

  ngOnDestroy(): void {
    if(this.x)
      this.x.unsubscribe();
  }
}
