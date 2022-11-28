import { Injectable } from '@angular/core';
//import firestore
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FireService {

  constructor( private fire:AngularFirestore, private router:Router) { }
  isAuthenticated = new BehaviorSubject(false);
users: any[];
  getAuth(){
    return this.isAuthenticated.value;
  }
  logAuth(){
    this.isAuthenticated.next(false);
    this.router.navigate(['/login']);
  }

  agregar(colecction,value){
    //coleccion: es igual a la key de storage, el nombre de la coleccion
    try {
      return this.fire.collection(colecction).add(value);


      //this.fire.collection(collecction).doc(value.rut);
    } catch (error) {
      console.log('ERROR: ', error);
      return false;
    }

  }
  obtenerUsuarios(coleccion){
    try {
      return this.fire.collection(coleccion).snapshotChanges();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  eliminar(coleccion, id){
    try {
      this.fire.collection(coleccion).doc(id).delete();
    } catch (error) {
      console.log('ERROR: ',error)
    }
  }

  obtenerUsuario(coleccion, id){
    try {
     return this.fire.collection(coleccion).doc(id).get();
    } catch (error) {
      console.log('ERROR: ', error)
    }
  }

  modificar(coleccion,id,value){
    try {
      this.fire.collection(coleccion).doc(id).set(value);
    } catch (error) {
      console.log('ERROR: ',error)
    }
  }

  validarRutPassword(rut, pass){
    return this.users.find(u => u.rut == rut && u.password == pass);
  }
//metodos para las clases
async agregarClase(coleccion, value){
  try {
   var aux = await this.fire.collection(coleccion).add(value);
    return aux.id;

    //this.fire.collection(collecction).doc(value.rut);
  } catch (error) {
    console.log('ERROR: ', error);
  }    
}

obtenerClases(coleccion){
  try {
    return this.fire.collection(coleccion).snapshotChanges();
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

obtenerClase(coleccion, id){
  try {
   return this.fire.collection(coleccion).doc(id).get();
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

eliminarClases(coleccion, id){
  try {
    this.fire.collection(coleccion).doc(id).delete();
  } catch (error) {
    console.log('ERROR: ',error)
  }
}

modificarClase(coleccion,id,value){
  try {
    this.fire.collection(coleccion).doc(id).set(value);
  } catch (error) {
    console.log('ERROR: ',error)
  }
}
async agregarAsistencia(coleccion, value){
  try {
    var aux = await this.fire.collection(coleccion).add(value);
    return aux.id;
    //this.fire.collection(collecction).doc(value.rut);
  } catch (error) {
    console.log('ERROR: ', error);

  }    
}
obtenerAsistencias(coleccion){
  try {
    return this.fire.collection(coleccion).snapshotChanges();
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

obtenerAsistencia(coleccion, id){
  try {
   return this.fire.collection(coleccion).doc(id).get();
  } catch (error) {
    console.log('ERROR: ', error)
  }
}

agregarAlumno(coleccion,id,value){
  try {
    this.fire.collection(coleccion).doc(id).set(value);
  } catch (error) {
    console.log('ERROR: ',error)
  }
}

login (correo, clave, lista): boolean{
  for(let u of lista){
    if(u.email == correo && u.password== clave){
      return true;
    }
  }
  return false;
}

}
