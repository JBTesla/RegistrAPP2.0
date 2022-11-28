import { Component, OnInit } from '@angular/core';


declare var google;

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {

  //VARIABLES PARA EL MAPA:
  latitud: number;
  longitud: number;
  //VARIABLE MAP: variable a través de la cual se carga el mapa de google.
  map: any;
  marker: any;
  search: any;
  //variables calcular ruta
  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();

  constructor() { }

  ngOnInit() {
    this.cargarMapa();
    /* this.obtenerUbicacion(); */
    this.autocompletado(this.map,this.marker);
  }

  //MÉTODOS PARA EL MAPA:
  cargarMapa(){
    //mapa: toma el elemento div llamado map desde el HTML:
    const mapa: HTMLElement = document.getElementById('map');

    this.map = new google.maps.Map(mapa, {
      center: {
        lat: -33.60962668977899,
        lng: -70.5750965398923
      },
      zoom: 18
    });
    this.directionsRenderer.setMap(this.map)
    const indicacionesHTML: HTMLElement = document.getElementById('indicaciones');
    this.directionsRenderer.setPanel(indicacionesHTML);

     this.marker = new google.maps.Marker({
      position: {lat: -33.60962668977899, lng: -70.5750965398923},
      map: this.map,
      title: 'Ubicacion inicial'
    });

  }

  obtenerUbicacion(){
    /* navigator.geolocation.getCurrentPosition(
      (geoposition: Geoposition) => {
        console.log(geoposition.coords.latitude);
        console.log(geoposition.coords.longitude);
      }
    ); */
  }

  autocompletado(mapaLocal,marcadorLocal){
    var autocomplete: HTMLElement = document.getElementById('autocomplete');
    const search = new google.maps.places.Autocomplete(autocomplete);
    search.bindTo('bounds', this.map);
    this.search = search;

    search.addListener('place_changed', function(){
      var place = search.getPlace().geometry.location;
      mapaLocal.setCenter(place);
      mapaLocal.setZoom(18);

      
      marcadorLocal.setPosition(place);
      marcadorLocal.setMap(mapaLocal);      
    });
  }

  // metodo ruta mas optima de 2 ubicaciones
  calcularRuta(){
    var place = this.search.getPlace().geometry.location;

    var request = {
      origin: {
        lat: -33.60962668977899,
        lng: -70.5750965398923
      },
      destination: place,
      travelMode: google.maps.TravelMode.DRIVING
    };
    this.directionsService.route(request, (resultado,status) =>{
      this.directionsRenderer.setDirections(resultado);
    })
    this.marker.setPosition(null);
  }
}
