import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderNavComponent } from 'src/components/header-nav/header-nav.component';
import { HomeComponent } from 'src/components/home/home.component';
import { PokemonCardsComponent } from 'src/components/pokemon-cards/pokemon-cards.component';
import { PokemonSearchComponent } from 'src/components/pokemon-search/pokemon-search.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderNavComponent },
  { path: 'pokemons', component: PokemonCardsComponent },
  { path: 'search', component: PokemonSearchComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
