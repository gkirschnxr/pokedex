import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DetailPokemon, SongsPokemon } from '../../models/pokemon';
import { convertToTitleCase } from '../../util/convert-to-title-case';
import { NgClass } from '@angular/common';
import { coresPorTipoMap } from '../../util/cores-por-tipo-map';

@Component({
  selector: 'app-details-pokemon',
  imports: [NgClass],
  templateUrl: './details-pokemon.html'
})

export class DetailsPokemon implements OnInit {
  public detailPokemon?: DetailPokemon;
  public coresPorTipoMap = coresPorTipoMap;

  private readonly route = inject(ActivatedRoute);

  private readonly url: string = "https://pokeapi.co/api/v2/pokemon/";
  private readonly http = inject(HttpClient);

  ngOnInit(): void {
    const pokemonId = this.route.snapshot.paramMap.get("id"); //snapshot = estado atual da rota

    const urlCompleto = `${this.url}/${pokemonId}`

    this.http.get(urlCompleto).subscribe(objDetails => {
      this.detailPokemon = this.mapDetailPokemon(objDetails);

      console.log(this.detailPokemon)
    })
  }

  private mapDetailPokemon(obj: any): DetailPokemon {
    const sprites: string[] = [
      obj.sprites.front_default,
      obj.sprites.back_default,
      obj.sprites.front_shiny,
      obj.sprites.back_default,
      obj.sprites.other.dream_world.front_default,
      obj.sprites.other["official-artwork"].front_default
    ];

    return {
      id: obj.id,
      nome: convertToTitleCase(obj.name),
      urlSprite: obj.sprites.front_default,
      tipos: obj.types.map((x: any) => convertToTitleCase(x.type.name)),
      sons: this.mapSongsPokemon(obj.cries),
      sprites: sprites
    }
  }

  private mapSongsPokemon(obj: any): SongsPokemon {
    return { atual: obj.latest, antigo: obj.legacy }
  }
}
