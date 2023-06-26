import { Slot, component$, useContextProvider, useStore, useVisibleTask$ } from '@builder.io/qwik';
import { type PokemonGameState, PokemonGameContext } from './pokemon-game.context';
import { type PokemonListState, PokemonListContext } from './pokemon-list.context';
export const PokemonProvider = component$(() => {
    const pokemonGame = useStore<PokemonGameState>({
        pokemonId:1,
        showBackImage:false,
        showImage:true
      })
    
      
    const pokemonList = useStore<PokemonListState>({
        currentPage:0,
        isLoading:false,
        pokemons:[]
    })
        
    useContextProvider(PokemonGameContext, pokemonGame)
    useContextProvider(PokemonListContext, pokemonList)

    useVisibleTask$(() => {
      if (localStorage.getItem('pokemon-game')) {
        const {pokemonId=1, showBackImage=false, showImage=true} = JSON.parse(localStorage.getItem('pokemon-game')!) as PokemonGameState;
        pokemonGame.pokemonId = pokemonId
        pokemonGame.showBackImage= showBackImage
        pokemonGame.showImage= showImage
      }
    })

    useVisibleTask$(({track}) => {
      track(() => [pokemonGame.pokemonId, pokemonGame.showBackImage, pokemonGame.showImage])
      localStorage.setItem('pokemon-game', JSON.stringify(pokemonGame))
    })
  return <Slot/>
});