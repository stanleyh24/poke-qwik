import { component$,$ } from '@builder.io/qwik';
import {  type DocumentHead, useNavigate } from '@builder.io/qwik-city';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { usePokemonGame } from '~/hooks/use-pokemon-game';




export default component$(() => {


  const nav = useNavigate() 
  const {
    pokemonId,
    showBackImage,
    showImage,
    nextPokemon,
    prevPokemon,
    toggleFromBack,
    toggleVisible
  } = usePokemonGame() 
  

 
  const goToPokemon = $((id:number) => {
    nav(`/pokemons/${id}`)
  })
  
  return (
    <>
     <span class="text-2xl">Buscador simple</span>
     <span class="text-9xl">{pokemonId.value}</span>
      <div onClick$={()=> goToPokemon(pokemonId.value)}>
       <PokemonImage id={pokemonId.value} size={200} backImage={showBackImage.value} isVisible={showImage.value} />
      </div>
      
     
     <div class="mt-2">
      <button onClick$={prevPokemon} class="btn btn-primary mr-4">Anterior</button>
      <button onClick$={nextPokemon} class="btn btn-primary mr-4">Siguiente</button>
      <button onClick$={toggleFromBack} class="btn btn-primary mr-4">Voltear</button>
      <button onClick$={toggleVisible} class="btn btn-primary">Revelar</button>
     </div>
    </>
  );
});

export const head: DocumentHead = {
  title: 'PokeQwik',
  meta: [
    {
      name: 'description',
      content: 'Esta es mi primera aplicacion en qwik',
    },
  ],
};
