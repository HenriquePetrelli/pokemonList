import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../..//environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  
  constructor(private http: HttpClient) { }

  async getPokemons(offset: Number) {
    return await this.http.get(`${environment.urlBase}pokemon?"limit=100&offset=${offset}`);
  }

  async getPokemonDetail(id: Number) {
    return await this.http.get(`${environment.urlBase}pokemon/${id}`);
  }

  async getPokemonByName(name: String) {
    return await this.http.get(`${environment.urlBase}pokemon/${name}`);
  }


}
