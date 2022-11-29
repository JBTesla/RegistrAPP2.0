import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
/* import { UserService } from 'src/app/services/user.service'; */
import { AlertController, LoadingController } from '@ionic/angular';
import { ValidatorsService } from 'src/app/services/validators.service';
import { FireService } from 'src/app/services/fire.service';
import { ToastController } from '@ionic/angular';
import { toastController } from '@ionic/core';



@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {
/* usuario : any =
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
    rut : new FormControl('', [Validators.required, Validators.pattern('[0-9]{1,2}.[0-9]{3}.[0-9]{3}-[0-9kK]{1}')]),
    email: new FormControl('',[Validators.required,Validators.pattern(/^[_a-z0-9-]+(\.[_a-z0-9-]+)*@['duocuc'-'profesor.duoc'-'duoc']+(\.cl)$/),Validators.email]),
    nom_completo: new FormControl('', [Validators.required, Validators.minLength(3)]),
    fecha_nac: new FormControl('', Validators.required),
    semestre: new FormControl('', [Validators.required, Validators.min(1), Validators.max(8)]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)]),
    tipo_usuario: new FormControl('alumno')
  });

  verificar_password: string;
  v_agregar: boolean = false;
  usuarios: any[] = [];


  //LLAVE:
/*   KEY_USUARIOS = 'usuarios'; */
  constructor(/* private userService: UserService, */ 
  private router: Router ,
  private validators : ValidatorsService,
  private alertController: AlertController,
  private loadingCtrl: LoadingController
  ,private fireService:FireService,
  private toast:ToastController) {
   }

 ngOnInit() {
  this.cargarUsuarios
  }
  //métodos:
  cargarUsuarios(){
    this.fireService.obtenerUsuarios('usuarios').subscribe(
      (data:any) => {
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

 registrar() {
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
    var respuesta =  this.fireService.agregar('usuarios', this.usuario.value);
    console.log(respuesta)
    if (respuesta) {
      this.cargando('Registrando Usuario...');
      this.usuario.reset();
      this.verificar_password = '';
      this.router.navigate(['/login']);
      /*console.log(respuesta)*/
    } else {
      this.toastError4();
      /*console.log(respuesta)*/
    }
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

