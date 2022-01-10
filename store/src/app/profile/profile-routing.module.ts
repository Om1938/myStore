import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from '../shared/components/navbar/navbar.component';
import { ProfileComponent } from './profile.component';

const routes: Routes = [{ path: '', component: ProfileComponent,children:[

  {
    path:'info',
    component:NavbarComponent
  }
] }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
