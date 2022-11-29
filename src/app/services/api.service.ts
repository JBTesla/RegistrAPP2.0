import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  async get(){
    return await this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=15');
  }
  
  async get2(){
    return await this.http.get('https://thesimpsonsquoteapi.glitch.me/quotes?count=1');
  }
}
