import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-api',
  templateUrl: './api.page.html',
  styleUrls: ['./api.page.scss'],
})
export class ApiPage implements OnInit {
  cantidadPersonajes: number =0;
  personajes:any[]=[];
  constructor(private apiService: ApiService) { }

  async ngOnInit() {
    let respuesta = await this.apiService.get();
    respuesta.subscribe((data:any) => {
    this.personajes = data;
    
    })
  }

}
