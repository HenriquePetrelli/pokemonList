import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PokemonService } from 'src/app/service/pokemon.service';

@Component({
  selector: 'app-pokemon-cards',
  templateUrl: './pokemon-cards.component.html',
  styleUrls: ['./pokemon-cards.component.scss']
})
export class PokemonCardsComponent implements OnInit {
  response: any;
  pokemons: any[] = [];
  pokemonsCount: any;
  pageEvent: PageEvent;
  pageIndex: Number
  paginatorLayout: boolean;
  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  
  constructor(private pokemonService: PokemonService,private _formBuilder: FormBuilder) {
    this.paginatorLayout = false;
    this.pageEvent = new PageEvent();
    this.pageIndex = 0
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getPokemons(this.pageIndex);
  
  }

  async getPokemons(offset: Number): Promise<void> {
    this.pokemons = [] = [];
    (await this.pokemonService.getPokemons(offset)).subscribe((response: any) => {
      this.response = response;
      this.pokemonsCount = response.count;
      this.getPokemonDetail(response.results);
    });
  }

  getPokemonDetail(pokemonList: any) {
    pokemonList.forEach(async (pokemon: any) => {
      (await this.pokemonService.getPokemonDetail(pokemon.name)).subscribe((response: any) => {
        this.pokemons.push(response);
      });
    });
  }

  paginatorAction(pageEvent: PageEvent): void {
    pageEvent.pageIndex < this.pageIndex ? this.changePage(false) : this.changePage(true);
    this.pageIndex = pageEvent.pageIndex;
  }

  changePage(isNextPage: boolean) {
    let offset;
    isNextPage ? offset = this.getOffsetNumber(this.response.next) : offset = this.getOffsetNumber(this.response.previous);
    this.getPokemons(Number(offset));
  }

  getOffsetNumber(currentOffset: String) {
    let offsetSplit = currentOffset.split("&");
    let offset = offsetSplit[0].split("=");
    return offset[1];
  }

  toggleLayout(event: any) {
    this.paginatorLayout = event.checked;
  }
    
}
