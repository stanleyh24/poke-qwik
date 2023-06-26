import { $, component$, useComputed$, useSignal, useStore } from '@builder.io/qwik';
import{ Link, type DocumentHead, routeLoader$, useLocation } from '@builder.io/qwik-city';
import type { SmallPokemon } from '~/interfaces';
import { getSmallPokemons } from '~/helpers/get-small-pokemons';
import { PokemonImage } from '~/components/pokemon/pokemon-image';
import { Modal } from '~/components/shared';

export const usePokemonList = routeLoader$<SmallPokemon[]>(async ({query, redirect, pathname}) => {
  const offset = Number(query.get('offset') || '0');
  if (isNaN(offset)) {
    redirect(301, pathname);
  }
  if (offset < 0) {
    redirect(301, pathname);
  }

 return await getSmallPokemons(offset)
})
export default component$(() => {

  const pokemons = usePokemonList();
  const location = useLocation();

  const modalVisible = useSignal(false);
  const modalPokemon = useStore({
    id:"",
    name:""
  })

  const showModal = $((id:string,name:string) => {
    modalPokemon.id= id
    modalPokemon.name= name
    modalVisible.value= true ;
  });

  const closeModal = $(() => {
    modalVisible.value= false ;
  });
  const currentOffSet = useComputed$<number>(()=>{
    const offsetString = new URLSearchParams(location.url.searchParams)
    return Number(offsetString.get('offset') || 0) 
  })
  return (
    <>
    <div class='flex flex-col'>
      <span class='text-5xl'>Status</span>
      <span>{currentOffSet}</span>
     
    </div>

    <div class='mt-10'>
      <Link href={`/pokemons/list-ssr/?offset=${currentOffSet.value - 10}`} class='btn btn-primary mr-2'>
        Anteriores
      </Link>

      <Link href={`/pokemons/list-ssr/?offset=${currentOffSet.value + 10}`} class='btn btn-primary mr-2'>
        Siguientes
      </Link>
    </div>

    <div class='grid grid-cols-6 mt-5'>
      {
        pokemons.value.map(({name, id}) => (
          <div key={name} onClick$={() => showModal(id, name)} class="m-5 flex flex-col justify-center items-center">
            <PokemonImage id={id}/>
            <span class="capitalize">{name}</span>
          </div>
        ))
      }
    </div>
   

      <Modal showModal={modalVisible.value} closeFn={closeModal} persistente size='md'>
      <div q:slot='title'>{modalPokemon.name}</div>
      <div q:slot='content' class=' flex flex-col justify-center items-center'>
        <PokemonImage id={modalPokemon.id}/>
        <span>preguntandole a ChatGPT</span>
      </div>
    </Modal>
    
    </>
  )
});

export const head: DocumentHead = {
  title: 'List SSR',
}