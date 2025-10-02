// Layout:
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Pokemon } from './models/pokemon';
import { NgClass } from '@angular/common';
import { coresPorTipoMap } from './util/cores-por-tipo-map';

// Decorator: equivalente do TS para os atributos
// tipo o [ApiController]
@Component({
  selector: 'app-root',
  imports: [NgClass],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})

export class App implements OnInit {  
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

          console.log(pokemon);

          this.pokemons.push(pokemon); //push = Add
        })
      }
    });
  }

  private mapPokemon(obj: any): Pokemon{
    return {
       nome: this.convertToTitleCase(obj.name),
       urlSprite: obj.sprites.front_default,
       tipos: obj.types.map((x: any) => this.convertToTitleCase(x.type.name))
    }
  }

  private convertToTitleCase(texto: string): string {
    if (texto.length < 1) return texto;

    const novaString = texto[0].toUpperCase() + texto.substring(1).toLowerCase();

    return novaString;
  }
}
