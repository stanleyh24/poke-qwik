import { component$ } from '@builder.io/qwik';
import { routeLoader$ } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';


export const  usePokemonId = routeLoader$<number> (({params, redirect}) => {
  const id = Number(params.id);
  if (isNaN(id)) {
    redirect(301, '/')
  }
  if (id <= 0) {
    redirect(301, '/')
  }
  return id
})
export default component$(() => {
  const pokemonId = usePokemonId();
  //const pokemonGame = useContext(PokemonGameContext)
const {toggleFromBack, toggleVisible, showBackImage,showImage } = usePokemonGame()
  return (
    <>
        <span class="text-5xl">Pokemon:{pokemonId.value}</span>
        <PokemonImage id={pokemonId.value} isVisible={showImage.value} backImage={showBackImage.value}/>

        <div class='mt-2'>
          <button class='btn btn-primary mr-2' onClick$={toggleFromBack}>Voltear</button>
          <button class='btn btn-primary ' onClick$={toggleVisible}>Revelar</button>
        </div>
    </>
  )
});