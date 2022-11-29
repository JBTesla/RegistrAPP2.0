import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { FireService } from 'src/app/services/fire.service';
import { UserService } from 'src/app/services/user.service';
import { AlertController, LoadingController } from '@ionic/angular';

@Component({
  selector: 'app-forget-pass',
  templateUrl: './forget-pass.page.html',
  styleUrls: ['./forget-pass.page.scss'],
})
export class ForgetPassPage implements OnInit {
  usuarios: any[] = [];
  email: string;
  KEY_USUARIOS = 'usuario';
  constructor(private toastController: ToastController,
     private router:Router,
     private usuarioService: UserService,
     private fireService: FireService,
     private loadingCtrl: LoadingController) { }

ngOnInit() {
    this.cargarUsuarios();
  }
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

recuperarPass(){
  var validarEmail= this.usuarios.find(user => user.email == this.email);
 if (validarEmail != undefined) {
  if (validarEmail.email == this.email) {
    this.cargando('Se ha enviado un correo electronico de recuperación!');
  }
 }else{
  this.tostadaError();
 }
}

async cargando(mensaje){
  const loading = await this.loadingCtrl.create({
    message: mensaje,
    duration: 1000
  });
  loading.present();
}
  //toast
  async tostadaError() {
    const toast = await this.toastController.create({
      message: 'Correo no registrado!!',
      duration: 3000
    });
    toast.present();
  }
}
