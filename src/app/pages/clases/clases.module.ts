import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ClasesPageRoutingModule } from './clases-routing.module';

import { ClasesPage } from './clases.page';
import { InputTrimModule } from 'ng2-trim-directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ClasesPageRoutingModule,
    ReactiveFormsModule,
    InputTrimModule
  ],
  declarations: [ClasesPage]
})
export class ClasesPageModule {}
