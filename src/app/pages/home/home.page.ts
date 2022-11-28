import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FireService } from 'src/app/services/fire.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  //variables de usuario que recibirá los datos que vienen desde login:
  usuarios: any[]=[];
  usuario: any;
  clases: any[]=[];
  clase:any;
  cantidadUsu: any;
  cantidadClass:any;

  constructor(private activatedRoute: ActivatedRoute,
     private router: Router,
      private userService: UserService,
      private fireService:FireService) {}

  ngOnInit(){
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    console.log(this.usuario)
    this.cantidadUsu = this.userService.cantidadUsuarios();
    this.cantidadClass = this.userService.cantidadClases();
  }

  //método para logout:
  logout(){
    this.fireService.logAuth();
  }
}