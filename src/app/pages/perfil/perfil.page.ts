import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  rut:string='';
  usuario: any []=[];
  usuarios:any [] =[];
/*   KEY_USUARIOS = 'usuarios'; */

  clase: any []= [];
  clases:any [] =[];
/*   KEY_CLASES = 'clases'; */

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private fireService:FireService) {}

ngOnInit() {
  this.rut = this.activatedRoute.snapshot.paramMap.get('rut');
/*   this.clase = this.fireService.obtenerClase('clases', this.rut); */
  this.cargarUsuario();
  this.cargarClase();
  console.log(this.usuario)
  }

cargarUsuario(){
  this.fireService.obtenerUsuarios('usuarios').subscribe(
    (data: any)=> {
      this.usuarios = []; 
      for(let u of data){
        let usuarioJson = u.payload.doc.data();
        usuarioJson['id'] = u.payload.doc.id;
        this.usuarios.push(usuarioJson);
        this.usuario = this.usuarios.find(u => u.rut == this.rut)
        console.log(this.usuario)
        //console.log(u.payload.doc.data());
      }
    }
  );
}
cargarClase(){
  this.fireService.obtenerClases('clases').subscribe(
   (data:any) => {
     this.clases = [];
     for(let c of data){
       let claseJson = c.payload.doc.data();
       claseJson['id'] = c.payload.doc.id;
       this.clases.push(claseJson);
       this.clase = this.clases.find(c => c.docente == this.rut);
       console.log
/*        this.claseD = this.clases.find(c => c.docente == this.rut); */
     }
   }
 );
}
}
