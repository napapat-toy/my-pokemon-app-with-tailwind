import axios from 'axios';
import { useEffect, useState } from 'react'
import Pokemon from './Pokemon';

const API = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=20`

function Pokemons() {
  const [api, setApi] = useState(API)
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState({})
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    axios.get(api).then(({ data }) => setPokemons(prev => [].concat(prev, data)))
  }, [api])

  const handleLoadMore = () => {
    setApi(pokemons[pokemons.length - 1].next)
  }

  const onClickPokemon = async (pokemonURL) => {
    await axios.get(pokemonURL).then(({ data }) => {
      setPokemon(data)
    })
    setOpenModal(true)
  }

  return (
    <div className='flex flex-col text-xl font-mono justify-center items-center bg-slate-100 rounded-md m-4'>

      {/* wrap pokemons */}

      <div className='flex flex-row flex-wrap justify-center items-center p-2 m-auto overflow-auto'>
        {pokemons.length > 0 ? (pokemons?.map((pokemonSet, loadTimes) => (
          pokemonSet.results?.map((pokemon, index) => (
            <button
              key={pokemon.name}
              className='hover:border-x-2 hover:border-gray-400 hover:bg-gray-200 active:bg-gray-300 rounded m-1 p-4 w-64 flex flex-col text-center justify-center items-center capitalize'
              onClick={() => onClickPokemon(pokemon.url)}
            >
              {/* pic max at 898.png then start at 10001.png */}
              <img
                src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${index >= 898 ? ((index + 9103)) : ((index + 1) + ((loadTimes) * 20))}.png`}
                alt={pokemon.name}
              />
              No.{(index + 1) + ((loadTimes) * 20)} {pokemon.name}
            </button>
          ))
        ))) : ('')}
      </div>

      <div>
        <button
          onClick={handleLoadMore}
          className=' bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-gray-300 text-2xl p-2 m-2 rounded-lg'
        >
          Load More
        </button>

      </div>
      {/* wrap pokemons */}

      {/* Modal */}
      {openModal ? (
        <Pokemon setOpenModal={setOpenModal} pokemonData={pokemon} />
      ) : ('')}
      {/* Modal */}

    </div>
  )
}

export default Pokemons