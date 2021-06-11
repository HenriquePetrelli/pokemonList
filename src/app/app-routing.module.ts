import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderMenuComponent } from 'src/components/header-menu/header-menu.component';
import { HomeComponent } from 'src/components/home/home.component';
import { PokemonCardsComponent } from 'src/components/pokemon-cards/pokemon-cards.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'header', component: HeaderMenuComponent },
  { path: 'pokemons', component: PokemonCardsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
