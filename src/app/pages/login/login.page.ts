import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NavigationExtras, Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
/* import { UserService } from 'src/app/services/user.service'; */

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //variables:
  usuario = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z0-9_]+([.][a-zA-Z0-9_]+)*@(duoc|duocuc|profesor.duoc).(cl)')]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(18)])
  });
  usuarios: any[]=[];
/*KEY_USUARIOS='usuarios'*/
  usuarioNavigate:any;

  constructor(private router: Router,
    /*private userService: UserService,*/
     private fireService:FireService) { }

  administradorDefault: any;
  profesorDefault: any;
  alumnoDefault:any;

  async ngOnInit() {
    //metodo anterior, los usuarios por default ahora se agregan directamente desde firebase
    /* this.administradorDefault={
      rut: '11.111.111-1',
      nom_completo: 'Admin',
      email:'d.min@duoc.cl',
      fecha_nac: '1990-05-01',
      semestre: 1,
      password: 'admin123',
      tipo_usuario: 'administrador'
    };
    this.profesorDefault={
      rut: '11.111.111-3',
      nom_completo: 'Profesor',
      email: 'pr.ofe@profesor.duoc.cl',
      fecha_nac: '1980-06-24',
      semestre: 1,
      password: 'profesor123',
      tipo_usuario: 'profesor'
    };
    this.alumnoDefault={
      rut: '11.111.111-2',
      nom_completo: 'Alumno',
      email: 'ul.mno@duocuc.cl',
      fecha_nac: '1999-03-03',
      semestre: 3,
      password: 'alumno123',
      tipo_usuario: 'alumno'
    }; */
/*     this.fireService.agregar('usuarios',this.administradorDefault); */
/*     await this.fireService.agregar('usuarios',this.profesorDefault);
    await this.fireService.agregar('usuarios',this.alumnoDefault); */
   await this.cargarUsuarios();
  }

cargarUsuarios(){
   this.fireService.obtenerUsuarios('usuarios').subscribe(
      (data : any) => {
        this.usuarios = [];
        for(let u of data){
          let usuarioJson = u.payload.doc.data();
          usuarioJson['id'] = u.payload.doc.id;
          this.usuarios.push(usuarioJson);
          console.log(this.usuarios)
          //console.log(u.payload.doc.data());
        }
      }
    );
  }
  //crear nuestro métodos:
   ingresar(){
    //rescatamos las variables del formulario por separado:
    var correoValidar = this.usuario.controls.email.value;
    var claveValidar = this.usuario.controls.password.value;
    /*console.log(correoValidar)*/
    /*console.log(claveValidar)*/
    //rescatamos el usuario con el método login usuario:
    var valida:boolean  = this.fireService.login(correoValidar,claveValidar,this.usuarios)
    var usuarioLogin = this.usuarios.find(user => user.email == correoValidar && user.password == claveValidar);
    //validamos si existe el usuario
    console.log(this.usuarios)
    if (valida == !undefined) {
      //Diferencia con el método anterior: antes de redireccionar, preparamos los datos que enviaremos para validar
      var navigationExtras: NavigationExtras = {
        state:{
          usuario: usuarioLogin
        }
      };
      //Según el tipo de usuario, se redirige al home respectivo
      this.router.navigate(['/home/bienvenido'], navigationExtras);
      this.fireService.isAuthenticated.next(true);
    }else{
      alert('Usuario o contraseña incorrectos!')}
    }
  }

/*     for(let u of this.usuarios){
      console.log(u)
      if(u.email == correoValidar && u.password == claveValidar){
        //UNA VEZ QUE VALIDO QUE EXISTE, ENVIARE ESOS DATOS A LA SIGUIENTE PÁGINA:
        let navigationExtras: NavigationExtras = {
          state: {
            usuario: usuarioLogin
          }
        };
        //PARA ENVIAR EL DATO QUE ESTA LISTO, SE ANEXA AL ROUTER!
        this.router.navigate(['/home/bienvenido'], navigationExtras);
        this.fireService.isAuthenticated.next(true);
      }else{
        alert('Usuario o contraseña incorrectos!')}
      }
  } */
/* } */