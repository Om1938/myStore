import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SharedMaterialModule } from './shared-material.module';
import { ReactiveFormsModule } from '@angular/forms';

const modules = [ReactiveFormsModule];

@NgModule({
  declarations: [NavbarComponent],
  imports: [CommonModule, SharedMaterialModule, ...modules],
  exports: [NavbarComponent, SharedMaterialModule, ...modules],
})
export class SharedModule {}
