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
  clase: any ={};
  KEY_CLASES = 'clases'

  asistencias: any[]=[];
  asistencia: any;
  asistenciaB: any[]=[];
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
/*        this.clase = this.clases.find(u => u.id == this.Qrcode) */
     }
   }
 );
}

cargarAsistencias(){
  this.fireService.obtenerClases('asistencia').subscribe(
   (data:any) => {
     this.asistencias = [];
     for(let a of data){
       let asistenciaJson = a.payload.doc.data();
       this.asistencias.push(asistenciaJson);
       this.asistencia = this.asistencias.find(a  => a.cod_clase == this.Qrcode)
       this.asistenciaB = this.asistencias.find(a  => a.cod_clase == this.Qrcode)
     }
   }
 );
}
/* cargarAsistencia(){
  this.fireService.obtenerAsistencia('asistencia',).
} */
async ingresarAsistencia2(id){
  (await this.fireService.obtenerClase('clases', id)).subscribe(
    (data:any)=>{
      this.clase = data.data()
      this.fireService.obtenerAsistencia('asistencia', this.clase.asistencia).subscribe(
        (data:any)=>{
          this.asistencia = data.data()
          console.log(this.asistencia)
          this.asistencia.alumnos.push(this.rut)
          this.fireService.agregarAlumno('asistencia', id ,this.asistencia);
          this.cargando('Ingresando asistencia...');
        }
      );
    }
  );
}

async cargando(mensaje){
  const loading = await this.loadingCtrl.create({
    message: mensaje,
    duration: 1000
  });
  loading.present();
}

}
