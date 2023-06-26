import { createContextId } from "@builder.io/qwik";

export interface PokemonGameState {
   pokemonId: number;
   showBackImage: boolean;
   showImage:boolean;
}

export const PokemonGameContext = createContextId<PokemonGameState>('pokemon.game-context');