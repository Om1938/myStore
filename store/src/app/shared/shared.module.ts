import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedMaterialModule } from './shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MatMenuModule } from '@angular/material/menu';
import { SidebarComponent } from './components/sidebar/sidebar.component';

const modules = [ReactiveFormsModule];

@NgModule({
  declarations: [NavbarComponent, SidebarComponent],
  imports: [
    CommonModule,
    SharedMaterialModule,
    ...modules,
    MatMenuModule,
    RouterModule,
  ],
  exports: [NavbarComponent, SharedMaterialModule, ...modules, SidebarComponent],
})
export class SharedModule {}
