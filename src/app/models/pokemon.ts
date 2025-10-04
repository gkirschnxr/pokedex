// isso é como o record no c#
export interface Pokemon {
  id:  number; // tanto para inteiro quanto decimal
  nome: string;
  urlSprite?: string;
  tipos: string;
}

// extends = herança
export interface DetailPokemon extends Pokemon {
  sons: SongsPokemon;
  sprites: string[];
  
}

export interface SongsPokemon {
  atual: string;
  antigo: string;
}