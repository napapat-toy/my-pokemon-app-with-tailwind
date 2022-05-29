import Pokemons from './components/Pokemons';
import { Routes, Route, Link } from "react-router-dom";
import Pokemon from './components/Pokemon';
import Filter from './components/Filter';
import { useEffect, useState } from 'react';
import axios from 'axios';

const API = `https://pokeapi.co/api/v2/pokemon?offset=0&limit=10000`

// ref
// https://www.pokemon.com/us/pokedex/
// https://th.portal-pokemon.com/play/pokedex
// https://www.serebii.net/pokedex-sm/025.shtml
// https://pokemondb.net/pokedex/all

const App = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const [pokemons, setPokemons] = useState([])
  const [pokemon, setPokemon] = useState([])
  const [searchFilter, setSearchFilter] = useState([])
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    axios.get(API).then(({ data }) => setPokemons(data.results))
  }, [])

  const handleSearchFilter = (search) => {
    setSearchTerm(search)
    let filterPokemon = pokemons.filter(searchPokemon => searchPokemon.name.toString().toLowerCase().indexOf(search.toLowerCase()) > -1)
    setSearchFilter(filterPokemon);
  }

  const handlePokemonModal = async (pokemonURL) => {
    await axios.get(pokemonURL).then(({ data }) => {
      setPokemon(data)
    })
    setSearchTerm('')
    setSearchFilter([]);
    setOpenModal(true)
  }

  return (
    <div className="container-xl bg-emerald-400 flex flex-col item-center w-full h-auto min-h-screen">
      <div className='text-3xl font-mono p-2 m-2 bg-white rounded-md justify-between flex flex-col sm:flex-row'>
        <h1 className='mx-4 p-auto m-auto'>
          <Link to={`/`}>Pokemon App</Link>
        </h1>
        <div className='flex'>
          <div className='flex flex-row items-center'>
            <div className='relative'>
              <input
                type={'text'}
                onChange={(e) => handleSearchFilter(e.target.value)}
                value={searchTerm}
                placeholder="Search"
                className='bg-blue-100 rounded-full outline-none px-4 py-2 m-2 w-11/12'
              />
              {searchTerm && searchFilter.length > 0 ? (
                <div className='absolute top-15 border-black border-2 rounded-md w-full max-h-80 overflow-y-auto bg-slate-100 p-1'>
                  {searchFilter.map(pokemon => (
                    <div
                      key={pokemon.name}
                      className='hover:bg-slate-300 cursor-pointer active:bg-slate-400'
                      onClick={() => handlePokemonModal(pokemon.url)}
                    >
                      {pokemon.name}
                    </div>
                  ))}
                </div>
              ) : ('')}
            </div>
          </div>
          <div className='bg-green-700 hover:bg-green-500 active:bg-green-600 text-white text-2xl p-2 m-2 rounded-lg'>
            <Link to={`/filter`}>Filter</Link>
          </div>
        </div>

      </div>

      <div className='flex flex-col mx-auto'>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/filter" a element={<Filter />} />
        </Routes>
      </div>

      {/* Modal */}
      {openModal ? (
        <Pokemon setOpenModal={setOpenModal} pokemonData={pokemon} />
      ) : ('')}
      {/* Modal */}

    </div>
  );
}

export default App;
