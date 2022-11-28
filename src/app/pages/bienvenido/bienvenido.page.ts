import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-bienvenido',
  templateUrl: './bienvenido.page.html',
  styleUrls: ['./bienvenido.page.scss'],
})
export class BienvenidoPage implements OnInit {
  rut:string='';
  usuario: any = {};
  usuarios:any [] =[];
  KEY_USUARIOS = 'usuarios';

  constructor(private activatedRoute: ActivatedRoute, private router: Router, private userService: UserService) {}

  async ngOnInit() {
    this.usuario = this.router.getCurrentNavigation().extras.state.usuario;
    console.log(this.usuario)
    this.option
  }
  option = {
/*     slidesPerView: 1.5, */
    centeredSlides: true,
    loop: true,
    spaceBetween: 10,
    autoplay:true,
  }
}
