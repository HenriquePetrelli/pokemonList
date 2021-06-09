import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private pokemonsUrl = " https://pokeapi.co/api/v2/pokemon?limit=10";
  constructor(private http: HttpClient,) { }

  getPokemons() {
    return this.http.get(this.pokemonsUrl)
  }
}
