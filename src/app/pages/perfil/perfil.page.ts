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
  id:string='';
  usuario: any []=[];
  usuarios:any [] =[];
/*   KEY_USUARIOS = 'usuarios'; */

  clase: any = {};
  clases:any [] =[];
/*   KEY_CLASES = 'clases'; */

  constructor(private activatedRoute: ActivatedRoute, 
    private router: Router, 
    private fireService:FireService) {}

ngOnInit() {
  this.id = this.activatedRoute.snapshot.paramMap.get('id');
  this.clase = this.fireService.obtenerClase('clases', this.id);
  this.cargarUsuario();
 
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
        this.usuario = this.usuarios.find(u => u.id = this.id)
        console.log(this.usuario)
        //console.log(u.payload.doc.data());
      }
    }
  );
}
}
