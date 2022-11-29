import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { LoadingController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { UserService } from 'src/app/services/user.service';
import { ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-clases',
  templateUrl: './clases.page.html',
  styleUrls: ['./clases.page.scss'],
})
export class ClasesPage implements OnInit {
    horario: any[]=[{
      tipo_horario:'Diurno'
    },
    {
      tipo_horario:'Vespertino'
    },];

  clase = new FormGroup({
    id : new FormControl(''),
    cod_clase: new FormControl(''),
    nombre:new FormControl('',),
    sigla_asignatura: new FormControl(''),
    semestre: new FormControl(''),
    docente:new FormControl(''),
    asistencia:new FormControl(''),
    horario: new FormControl('this.horario'),
  });
  clases: any[]=[];
  /* KEY_CLASES ='clases'; */

  //docente: any;
  usuarios: any[]=[];
  docentes: any[]=[];


  constructor(private usuarioService: UserService,
    private loadingCtrl: LoadingController,
    private fireService:FireService,
    private toast:ToastController) { }

  ngOnInit() {
    this.cargarUsuarios();
    this.cargarClases();
  }
  cargarUsuarios(){
      this.fireService.obtenerUsuarios('usuarios').subscribe(
        (data:any) => {
          this.usuarios = [];
          for(let u of data){
            let usuarioJson = u.payload.doc.data();
            usuarioJson['id'] = u.payload.doc.id;
            this.usuarios.push(usuarioJson);
            this.docentes = this.usuarios.filter(u => u.tipo_usuario == 'profesor');
            //console.log(u.payload.doc.data());
          }
        }
      );
  
  }
  cargarClases(){
      this.fireService.obtenerClases('clases').subscribe(
        (data:any) => {
          this.clases = [];
          for(let u of data){
            let claseJson = u.payload.doc.data();
            claseJson['id'] = u.payload.doc.id;
            this.clases.push(claseJson);
            //console.log(u.payload.doc.data());
          }
        }
      );
    }
  async crearClase(){
  var respuesta = await this.fireService.agregarClase('clases', this.clase.value);
  this.clase.value.id = respuesta
  this.fireService.modificar('clases',respuesta,this.clase.value)
  if (respuesta) {
    alert('clase creada!');
   this.cargarClases();
  } else {
    /* console.log(respuesta) */
   this.toastError();
  }
  }
  
  eliminarClase(id){
      this.fireService.eliminarClases('clases',id);
      this.cargando('actualizando clases...');
      this.cargarClases();
    }

  buscarClase(id){
    let claseEncontrada = this.fireService.obtenerClase('clases',id);
    claseEncontrada.subscribe(
      (response: any) =>{
        console.log(response.data());
        let clase = response.data();
        clase['id']= response.id;

        this.clase.setValue( clase );
      }
    );
  }
  
  modificarClase(){
    let id = this.clase.controls.id.value;
    let claseModific={
      cod_clase: this.clase.controls.cod_clase.value,
      nombre: this.clase.controls.nombre.value,
      sigla_asignatura: this.clase.controls.sigla_asignatura.value,
      semestre: this.clase.controls.semestre.value,
      docente: this.clase.controls.docente.value,
      horario: this.clase.controls.horario.value
      
    }
    this.clase.removeControl('id')

    this.fireService.modificar('usuarios', id, claseModific);
    this.clase.addControl
  }

  limpiar(){
    this.clase.reset();
  }
  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }

  async toastError() {
    const toast = await this.toast.create({
      message: 'Clase ya existe!',
      duration: 3000
    });
    toast.present();
  }
}


