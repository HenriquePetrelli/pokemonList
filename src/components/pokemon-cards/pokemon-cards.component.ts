import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { PokemonService } from 'src/app/service/pokemon.service';
import { Helper } from 'src/app/utils/helper';

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

  constructor(
    private _pokemonService: PokemonService,
    private formBuilder: FormBuilder,
    private _helper: Helper) {
    this.paginatorLayout = false;
    this.pageEvent = new PageEvent();
    this.pageIndex = 0
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.getPokemons(this.pageIndex);

  }

  async getPokemons(offset: Number): Promise<void> {
    this.pokemons = [] = [];
    (await this._pokemonService.getPokemons(offset)).subscribe((response: any) => {
      this.response = response;
      this.pokemonsCount = response.count;
      this.getPokemonDetail(response.results);
    }, error => {
      let msgError = this._helper.returnMsgToRequest(error);
    });
  }

  getPokemonDetail(pokemonList: any) {
    pokemonList.forEach(async (pokemon: any) => {
      (await this._pokemonService.getPokemonDetail(pokemon.name)).subscribe((response: any) => {
        this.pokemons.push(response);
      }, error => {
        let msgError = this._helper.returnMsgToRequest(error);
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
