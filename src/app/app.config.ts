import { provideHttpClient } from '@angular/common/http';
import { ApplicationConfig, provideBrowserGlobalErrorListeners, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { ListPokemons } from './components/list-pokemons/list-pokemons';
import { DetailsPokemon } from './components/details-pokemon/details-pokemon';

const routes: Routes = [
  { path: '', redirectTo: 'pokemons', pathMatch: 'full'},
  { path:'pokemons', component: ListPokemons},
  { path:'pokemons/:id', component: DetailsPokemon}
];

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient()
  ]
};
