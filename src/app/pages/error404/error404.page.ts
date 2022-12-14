import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-error404',
  templateUrl: './error404.page.html',
  styleUrls: ['./error404.page.scss'],
})
export class Error404Page implements OnInit {
  cantidadPersonajes: number =0;
  personajes:any[]=[];
  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    let respuesta = await this.apiService.get2();
    respuesta.subscribe((data:any) => {
    this.personajes = data;
    
    })
  }

}

