import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AlumnoPageRoutingModule } from './alumno-routing.module';

import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';


import { AlumnoPage } from './alumno.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AlumnoPageRoutingModule,
    NgxQRCodeModule
  ],
  declarations: [AlumnoPage]
})
export class AlumnoPageModule {}
