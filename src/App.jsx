import Pokemons from './components/Pokemons';
import { Routes, Route, Link } from "react-router-dom";
import Pokemon from './components/Pokemon';
import Filter from './components/Filter';

// ref
// https://www.pokemon.com/us/pokedex/
// https://th.portal-pokemon.com/play/pokedex
// https://www.serebii.net/pokedex-sm/025.shtml
// https://pokemondb.net/pokedex/all

const App = () => {

  return (
    <div className="container-xl bg-emerald-400 flex flex-col item-center w-full h-auto min-h-screen">
      <div className='text-3xl font-mono p-2 m-2 bg-white rounded-md justify-between flex flex-row'>
        <h1 className='mx-4 p-auto m-auto'>
          <Link to={`/`}>Pokemon App</Link>
        </h1>
        <div className='flex'>
          {/* <div className='flex flex-row items-center ' >
            <p>Search</p>
            <input type={'text'} className='bg-blue-100 rounded-full outline-none px-4 py-2 m-2 w-auto' />
          </div> */}
          <div className='bg-green-700 hover:bg-green-500 active:bg-green-600 text-white text-2xl p-2 m-2 rounded-lg'>
            <Link to={`/filter`}>Filter</Link>
          </div>
        </div>

      </div>

      <div className='flex flex-col mx-auto'>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          {/* <Route path="/:pokemonName" element={<Pokemon />} /> */}
          <Route path="/filter" a element={<Filter />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
