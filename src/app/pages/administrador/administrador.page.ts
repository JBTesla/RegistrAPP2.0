import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ValidatorsService } from 'src/app/services/validators.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FireService } from 'src/app/services/fire.service';
import { ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';

@Component({
  selector: 'app-administrador',
  templateUrl: './administrador.page.html',
  styleUrls: ['./administrador.page.scss'],
})
export class AdministradorPage implements OnInit {


  tipoUser: any[]=[{
    tipo_usu:'alumno'
  },
  {
    tipo_usu:'profesor'
  },
  {
    tipo_usu:'administrador'
  }];
 /*  usuario : any =
  {
      rut : '',
      email: '',
      nom_completo:'', 
      fecha_nac: '',
      semestre:'',
      password: '',
      tipo_usuario:'' 
  } */
  usuario = new FormGroup({
    id : new FormControl(''),
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc'-'duoc']+(\.cl)$/),Validators.email]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('this.tipoUser')
  });
  verificar_password: string;
  
  usuarios: any[] = [];
  KEY_USUARIOS = 'usuarios';
  v_agregar:boolean=false;

  constructor(private usuarioService: UserService,
    private alertController: AlertController,
    private loadingCtrl: LoadingController,
    private validators:ValidatorsService,
    private router:Router,
    private fireService:FireService,
    private toast:ToastController){
  }

  ngOnInit() {
    this.cargarUsuarios();
  }

  //método del formulario
 cargarUsuarios(){
  this.fireService.obtenerUsuarios('usuarios').subscribe(
    (data: any)=> {
      this.usuarios = []; 
      for(let u of data){
        let usuarioJson = u.payload.doc.data();
        usuarioJson['id'] = u.payload.doc.id;
        this.usuarios.push(usuarioJson);
        //console.log(u.payload.doc.data());
      }
    }
  );
}

async registrar() {
  //validación de salida para buscar un rut válido.
  if (!this.validators.validarRut(this.usuario.controls.rut.value)) {
    this.toastError1();
    return;
  }
  //validación de salida para verificar que persona tenga al menos 17 años.
  if (!this.validators.validarEdadMinima(17, this.usuario.controls.fecha_nac.value)) {
    this.toastError2();
    return;
  }
  //validación de coincidencia de contraseñas.
  if (this.usuario.controls.password.value != this.verificar_password) {
    this.toastError3();
    return;
  }
  var respuesta = this.fireService.agregar('usuarios', this.usuario.value);
  console.log(respuesta)
  if (respuesta) {
    this.cargando('Registrando usuario...');
    this.v_agregar=true;
    this.usuario.reset();
    this.verificar_password = '';
    this.cargarUsuarios();
  } else {
    this.toastError4();
  }
}

eliminar(id){
    this.fireService.eliminar('usuarios',id);
/*     await this.usuarioService.eliminarUsuario(this.KEY_USUARIOS, rut);
    await this.cargando('actualizando usuarios...');
    await this.cargarUsuarios(); */
  }

   buscar(id){
     let usuarioEncontrado = this.fireService.obtenerUsuario('usuarios',id);
     usuarioEncontrado.subscribe(
       (response: any) =>{
         console.log(response.data());
         let usu = response.data();
         usu['id']= response.id;

         this.usuario.setValue( usu );
       }
     );
/*     var usuarioEncontrado = await this.usuarioService.obtenerUsuario(this.KEY_USUARIOS, rut);
    this.usuario.setValue(usuarioEncontrado);
    console.log(this.usuario) */
    //this.usuario.setValue(personaE);
  }

    modificar(){
      let id = this.usuario.controls.id.value;
      let ususModific={
        rut: this.usuario.controls.rut.value,
        nom_completo: this.usuario.controls.nom_completo.value,
        email: this.usuario.controls.email.value,
        fecha_nac: this.usuario.controls.fecha_nac.value,
        semestre: this.usuario.controls.semestre.value,
        password: this.usuario.controls.password.value,
        tipo_usuario: this.usuario.controls.tipo_usuario.value
      }
      this.usuario.removeControl('id')

      this.fireService.modificar('usuarios', id, ususModific);
      this.usuario.addControl
     //console.log(this.alumno.value);
/*     await this.usuarioService.modificarUsuario(this.KEY_USUARIOS, this.usuario.value);
    this.cargando('actualizando usuarios....')
    this.limpiar();
    await this.cargarUsuarios(); */
  }

  limpiar(){
    this.usuario.reset();
    this.verificar_password = '';
  }
  async cargando(mensaje){
    const loading = await this.loadingCtrl.create({
      message: mensaje,
      duration: 1000
    });
    loading.present();
  }
  async toastError1() {
    const toast = await this.toast.create({
      message: 'Rut Incorrecto!',
      duration: 3000
    });
    toast.present();
  }
  async toastError2() {
    const toast = await this.toast.create({
      message: 'Edad minima 17 años!',
      duration: 3000
    });
    toast.present();
  }
  async toastError3() {
    const toast = await this.toast.create({
      message: 'contraseñas no coinciden!',
      duration: 3000
    });
    toast.present();
  }
  async toastError4() {
    const toast = await this.toast.create({
      message: 'Usuario ya existe!',
      duration: 3000
    });
    toast.present();
  }
}