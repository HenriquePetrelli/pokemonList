import { Component, OnInit } from '@angular/core';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Helper } from 'src/app/utils/helper';

@Component({
  selector: 'app-pokemon-search',
  templateUrl: './pokemon-search.component.html',
  styleUrls: ['./pokemon-search.component.scss']
})
export class PokemonSearchComponent implements OnInit {
  pokemonName: String;
  pokemon: any;
  pokemonImage: String;
  pokemonStats: any;
  constructor(
    private _pokemonService: PokemonService,
    private _helper: Helper
  ) {
    this.pokemonName = "charizard";
    this.pokemonImage = "";
    this.pokemonStats = [];
  }

  ngOnInit(): void {
    this.getPokemonByName(this.pokemonName);
  }

  async getPokemonByName(name: String) {
    let request = (await this._pokemonService.getPokemonByName(name)).subscribe((response: any) => {
      this.pokemon = response.name;
      this.pokemonImage = response.sprites.other.dream_world.front_default
      this.pokemonStats = response.stats;
    }, error => {
      let msgError = this._helper.returnMsgToRequest(error);
      this._helper.showToastMsg(msgError.error, "", 6000);
    });
  }

  searchPokemonByName() {
    let pokemon = this.pokemonName.toLowerCase().trim();
    this.getPokemonByName(pokemon);
  }

}
