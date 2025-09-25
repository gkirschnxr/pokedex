// Layout:
import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit, signal } from '@angular/core';

// isso é como o record no c#
interface Pokemon {
  nome: string;
  urlSprite?: string;
}

// Decorator: equivalente do TS para os atributos
// tipo o [ApiController]
@Component({
  selector: 'app-root',
  imports: [],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {  
  public pokemons: Pokemon[] = [];
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
       nome: this.convertToTitleCase(obj.name),
       urlSprite: obj.sprites.front_default
    }
  }

  private convertToTitleCase(texto: string): string {
    if (texto.length < 1) return texto;

    const novaString = texto[0].toUpperCase() + texto.substring(1).toLowerCase();

    return novaString;
  }
}
