import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private userService:UserService,
    private activatedRoute: ActivatedRoute,
    private loadingCtrl: LoadingController,
    private fireService:FireService) { }
  rut: string;
  clases:any[]=[];
  clase: any[]=[];
  KEY_CLASES = 'clases'

  asistencias: any[]=[];
  asisntencia: any;
  KEY_ASISTENCIAS = 'asistencias'

  Qrcode: any;

  async ngOnInit() {
    this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
    await this.cargarClases();
    await this.cargarAsistencias();
  }

cargarClases(){
  this.fireService.obtenerClases('clases').subscribe(
   (data:any) => {
     this.clases = [];
     for(let c of data){
       let claseJson = c.payload.doc.data();
       claseJson['id'] = c.payload.doc.id;
       this.clases.push(claseJson);
     }
   }
 );
}

cargarAsistencias(){
  this.fireService.obtenerClases('asistencias').subscribe(
   (data:any) => {
     this.asistencias = [];
     for(let a of data){
       let asistenciaJson = a.payload.doc.data();
       this.asistencias.push(asistenciaJson);
     }
   }
 );
}

/* cargarAsistencia(){
  this.fireService.obtenerAsistencia('asistencia',).
} */

ingresarAsistencia(asisntenciaAl){
  //console.log(this.rut): verificar el rut
    this.clase = this.clases.find(u => u.cod_clase == this.Qrcode)
    this.fireService.agregarAlumno('asistencia', asisntenciaAl ,this.rut);
    this.cargando('Ingresando a la asistencia...');
}
async cargando(mensaje){
  const loading = await this.loadingCtrl.create({
    message: mensaje,
    duration: 1000
  });
  loading.present();
}

}
