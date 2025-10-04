import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { Pokemon } from '../../models/pokemon';
import { coresPorTipoMap } from '../../util/cores-por-tipo-map';
import { NgClass } from '@angular/common';
import { RouterLink } from '@angular/router';
import { convertToTitleCase } from '../../util/convert-to-title-case';

@Component({
  selector: 'app-list-pokemons',
  imports: [NgClass, RouterLink],
  templateUrl: './list-pokemons.html'
})
export class ListPokemons implements OnInit {
  public pokemons: Pokemon[] = [];
  public coresPorTipoMap = coresPorTipoMap;

  private readonly url: string = "https://pokeapi.co/api/v2/pokemon/";
  private readonly http = inject(HttpClient);

  ngOnInit(): void { 
    this.http.get(this.url).subscribe((obj: any) => { //subscribe = await
      const arrayResultados: any[] = obj.results;
      
      for (let result of arrayResultados) {
        this.http.get(result.url).subscribe(objDetails => {
          const pokemon = this.mapPokemon(objDetails)

          this.pokemons.push(pokemon); //push = Add
        })
      }
    });
  }

  private mapPokemon(obj: any): Pokemon{
    return {
       id: obj.id,
       nome: convertToTitleCase(obj.name),
       urlSprite: obj.sprites.front_default,
       tipos: obj.types.map((x: any) => convertToTitleCase(x.type.name))
    }
  }
}
