import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
  pokemonName: String;
  pokemon: any;
  pokemonImage: String;
  pokemonStats:any;
  constructor(
   private pokemonService: PokemonService
  ) {
    this.pokemonName = "charizard";
    this.pokemonImage = "";
    this.pokemonStats = [];
   }

  ngOnInit(): void {
    this.getPokemonByName(this.pokemonName);
  }

  async getPokemonByName(name: String) {
    (await this.pokemonService.getPokemonByName(name)).subscribe((response: any) => {
      this.pokemon = response.name;
      this.pokemonImage = response.sprites.other.dream_world.front_default
      this.pokemonStats = response.stats;
      console.log(this.pokemon)
    });
  }

  searchPokemonByName() {
    let pokemon = this.pokemonName.toLowerCase().trim();
    this.getPokemonByName(pokemon);
  }

}
