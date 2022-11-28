import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  //variables necesarias para el trabajo del CRUD:
  users: any[]=[];
  user: any;
  isAuthenticated = new BehaviorSubject(false);

  clases: any[]=[];
  clase: any;

  asistencias: any[]=[];
  asistencia: any;
  

  constructor(private router:Router,private storage: Storage) {
    storage.create();
   }

  //métodos del CRUD:
  async recuperarPass(key, user){
    this.users = await this.storage.get(key) || [];
    if ( this.obtenerUsuario(key, user.rut) == undefined ) {
      return true;
    }
    return false;
  }
  async agregarUsuario(key, user){
      this.users = await this.storage.get(key) || [];

      this.user = await this.obtenerUsuario(key, user.rut);
      if(this.user == undefined){
        this.users.push(user);
        await this.storage.set(key, this.users)
        return true;
      }
      return false;
  
  }
  async obtenerUsuario(key, id)
  {
    this.users = await this.storage.get(key) || [];
    this.user = await this.users.find(user => user.rut == id);
    return this.user;
  }

  async obtenerUsuarios(key): Promise<any[]> {
    this.users = await this.storage.get(key);
    return this.users;
  }

  async eliminarUsuario(key, rut){
    this.users = await this.storage.get(key) || [];
    //if(this.usuarios.length == 0){
      //return
    //}
    this.users.forEach((value, index) => {
      if (value.rut == rut) {
        this.users.splice(index, 1);
      }
    });
    await this.storage.set(key, this.users);
  }

  async modificarUsuario(key, dato){
    this.users = await this.storage.get(key) || [];
    var index = this.users.findIndex(user => user.rut == dato.rut);
    this.users[index] = dato;

    await this.storage.set(key,this.users);
  }

  //MÉTODO CUSTOMER:
  //validar rut y contraseña: método que recibe rut y password y me entrega un JSON de un usuario
  validarRutPassword(rut, pass){
    return this.users.find(u => u.rut == rut && u.password == pass);
  }
  //métodos customer:
  async loginUsuario(key,email, password) {
    this.users = await this.storage.get(key) || [];
    var usuarioLogin: any;
    usuarioLogin = this.users.find(user => user.email == email && user.password == password);
    if (usuarioLogin != undefined) {
      //PARA CAMBIAR EL VALOR A UN BehaviorSubject SE UTILIZA EL METODO .next(valor);
      this.isAuthenticated.next(true);
      return usuarioLogin;
    }
      }
      getAuth(){
        return this.isAuthenticated.value;
      }
      logout(){
        this.isAuthenticated.next(false);
        this.router.navigate(['/login']);
      }

      validarCorreo(correo){
        return this.users.find(usu => usu.correo == correo);
      }
  cantidadUsuarios(): number{
    return this.users.length;
  }
//metodos para crear clases
async obtenerClase(key, cod_clase )
  {
    console.log(cod_clase)
    this.clases = await this.storage.get(key) || [];
    this.clase = await this.clases.find(clase => clase.cod_clase == cod_clase);
    return this.clase;
  }
  async obtenerClases(key): Promise<any[]> {
    this.clases = await this.storage.get(key);
    return this.clases;
  }
  cantidadClases(): number{
    return this.clases.length;
  }

  async obtenerDocente(key)
  {
    this.users = await this.storage.get(key) || [];
    this.user = this.users.find(user => user.tipo_usuario == 'profesor');
    return this.user;
  }
  async obtenerDocentes(key): Promise<any[]> {
    this.users = await this.storage.get(key) || [];
    this.users = await this.users.filter(u => u.tipo_usuario == 'profesor');
    console.log(this.users)
    return this.users;
  }
  async agregarClase(key, clase){
    this.clases = await this.storage.get(key) || [];
    this.clase = await this.obtenerClase(key, clase.cod_clase);
    if(this.clase == undefined){
      this.clases.push(clase);
      await this.storage.set(key, this.clases)
      return true;
    }
    return false;
}
async eliminarClass(key, cod){
  this.clases = await this.storage.get(key) || [];
    //if(this.usuarios.length == 0){
      //return
    //}
    this.clases.forEach((value, index) => {
      if (value.cod_clase == cod) {
        this.clases.splice(index, 1);
      }
    });
    await this.storage.set(key, this.clases);
}
async modificarClass(key, claseU){
  this.clases = await this.storage.get(key) || [];
  var index = this.clases.findIndex(clase => clase.cod_clase == claseU.cod_clase);
  this.clases[index] = claseU;

  await this.storage.set(key,this.clases);
}
  async obtenerClaseDocente(key, rut){
    this.clases = await this.storage.get(key) || [];
    this.clases = await this.clases.find(clase => clase.docente == rut)
    return this.clases;
  }
  async obtenerAsistencia(key, cod_asistencia){
    this.asistencias = await this.storage.get(key) || [];
    this.asistencia = await this.asistencias.find(a => a.cod_asistencia == cod_asistencia);
    return this.asistencia;
  }
  async obtenerAsistencias(key): Promise<any[]> {
    this.asistencias = await this.storage.get(key) || [];
    return this.asistencias;
  }

  async agregarAsistencia(key, asistencia){
    this.asistencias = await this.storage.get(key) || [];
    this.asistencia = await this.obtenerAsistencia(key, asistencia.cod_asistencia);
    if(this.asistencia == undefined)
    {
      this.asistencias.push(asistencia);
      await this.storage.set(key, this.asistencias)
      return true;
    }
    return false;
  }
  async ingresarAsistencia(key, cod_asistencia,rut){
    this.asistencias = await this.storage.get(key) || [];
    
    let index = this.asistencias.findIndex(a => a.cod_asistencia == cod_asistencia);
    console.log(this.asistencias[index].alumnos);
    this.asistencias[index].alumnos.push(rut);
    console.log(this.asistencias[index].alumnos);
    /* var asistenciaACT = this.asistencia.alumnos.push(rut); */
  /*   console.log(asistenciaACT) */
    //this.asistencias[index]=this.asistencias[index].alumnos.push(rut);
    //console.log(this.asistencias)
    await this.storage.set(key, this.asistencias);
  }
  async idClase(key){
    this.asistencias = await this.storage.get(key) || [];
    var id = 0
  for (let index = 0; index < this.asistencias.length; index++) {
      id = this.asistencias[index].cod_asistencia;
    }
    return id+1
  }
}
