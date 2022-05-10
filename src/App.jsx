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
    <div className="container-xl bg-emerald-400 flex flex-col item-center h-auto">
      <div className='text-3xl font-mono p-2 m-2 bg-white rounded-md justify-start flex flex-row'>
        <h1 className='mx-4 p-auto m-auto'>
          Pokemon App
        </h1>
        <div className='flex'>
          <div className='bg-green-700 hover:bg-green-500 active:bg-green-600 text-white text-2xl p-2 m-2 rounded-lg'>
            <Link to={`/`}>Home</Link>
          </div>
          <div className='bg-green-700 hover:bg-green-500 active:bg-green-600 text-white text-2xl p-2 m-2 rounded-lg'>
            <Link to={`/filter`}>Filter</Link>
          </div>
        </div>

      </div>

      <div className='flex flex-col m-auto'>
        <Routes>
          <Route path="/" element={<Pokemons />} />
          <Route path="/:pokemonName" element={<Pokemon />} />
          <Route path="/filter" a element={<Filter />} />
        </Routes>
      </div>

    </div>
  );
}

export default App;
