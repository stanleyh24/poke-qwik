import { $, useComputed$, useContext } from "@builder.io/qwik"
import { PokemonGameContext } from "~/context"

export const usePokemonGame = () => {

    const pokemonGame = useContext(PokemonGameContext) 
    const changePokemonID = $( (value:number) => {
        if (pokemonGame.pokemonId + value <= 0) {
          return
        }
        pokemonGame.pokemonId += value;
      })

    const toogleFromBack = $(() => {
        pokemonGame.showBackImage = !pokemonGame.showBackImage
    })

    const toogleVisible = $(() => {
        pokemonGame.showImage = !pokemonGame.showImage
    })

    return {
        pokemonId:useComputed$(() => pokemonGame.pokemonId),
        showBackImage:useComputed$(() => pokemonGame.showBackImage),
        showImage:useComputed$(() => pokemonGame.showImage),

        nextPokemon: $(() => changePokemonID(+1)),
        prevPokemon: $(() => changePokemonID(-1)),
        toggleFromBack: toogleFromBack,
        toggleVisible: toogleVisible

    }
}