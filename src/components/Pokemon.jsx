import { useState } from 'react'

function Pokemon({ setOpenModal, pokemonData }) {

  const colours = {
    normal: '#A8A77A',
    fighting: '#C22E28',
    flying: '#A98FF3',
    poison: '#A33EA1',
    ground: '#E2BF65',
    rock: '#B6A136',
    bug: '#A6B91A',
    ghost: '#735797',
    steel: '#B7B7CE',
    fire: '#EE8130',
    water: '#6390F0',
    grass: '#7AC74C',
    electric: '#F7D02C',
    psychic: '#F95587',
    ice: '#96D9D6',
    dragon: '#6F35FC',
    dark: '#705746',
    fairy: '#D685AD',
  };

  const [showMore, setShowMore] = useState(false)

  const MinimalDetail = () => {
    return (
      <div className='flex flex-col justify-center items-center px-2 w-60'>
        <img src={pokemonData.sprites?.front_default} className='w-40' alt={pokemonData.name} />
        <div className='font-bold text-3xl mb-4'>{pokemonData.name}</div>
        <div className='self-start'>
          <div>
            <p className='font-bold inline-block '>Height:</p>
            <p className='inline-block ml-1'>{pokemonData.height}</p>
          </div>
          <div>
            <p className='font-bold inline-block'>Weight:</p>
            <p className='inline-block ml-1'>{pokemonData.weight}</p>
          </div>

          <div className='space-x-2'>
            <div className='font-bold'>Ability: </div>{pokemonData.abilities?.map(({ ability }, index, arr) => (
              <p key={ability.name} className='inline-block' > {ability.name}{index === arr.length - 1 ? ('') : (',')} </p>
            ))}
          </div>

          <div className='space-x-2'>
            <div className='font-bold'>Type: </div>{pokemonData.types?.map(({ type }, index, arr) => (
              <div className='inline-block' key={type.name}>
                <p className='inline-block px-2' style={{ backgroundColor: colours[type.name] }}>{type.name}</p>
                {index === arr.length - 1 ? ('') : (',')}
              </div>
            ))}
          </div>

        </div>

      </div>
    )
  }

  const FullDetail = () => {
    return (
      <div className='flex flex-col justify-start items-center px-4 max-w-4xl' >
        <img src={pokemonData.sprites?.front_default} className='w-40' alt={pokemonData.name} />
        <div className='font-bold text-3xl mb-4'>{pokemonData.name}</div>
        <div>
          {/* upper */}
          <div className='flex flex-col md:flex-row justify-between border-t-4 border-gray-500'>
            <div className='mt-1'>
              <div>
                <p className='font-bold inline-block '>Height:</p>
                <p className='inline-block ml-1'>{pokemonData.height}</p>
              </div>
              <div>
                <p className='font-bold inline-block'>Weight:</p>
                <p className='inline-block ml-1'>{pokemonData.weight}</p>
              </div>
              <div className='space-x-2'>
                <div className='font-bold'>Ability: </div>{pokemonData.abilities?.map(({ ability }, index, arr) => (
                  <p key={ability.name} className='inline-block' > {ability.name}{index === arr.length - 1 ? ('') : (',')} </p>
                ))}
              </div>
              <div className='space-x-2'>
                <div className='font-bold'>Type: </div>{pokemonData.types?.map(({ type }, index, arr) => (
                  <div className='inline-block' key={type.name}>
                    <p className='inline-block px-2' style={{ backgroundColor: colours[type.name] }}>{type.name}</p>
                    {index === arr.length - 1 ? ('') : (',')}
                  </div>
                ))}
              </div>
            </div>
            <div className='md:border-l-4 md:border-gray-500'>
              <div className='mx-2 mt-1'>
                <div className='font-bold'>Stats:</div> {pokemonData.stats?.map((value) => (
                  <div key={value.stat.name} className='inline-block flex flex-row items-start mx-2'>
                    <p className='font-bold inline-block'>{value.stat.name}:</p>
                    <p className='ml-1'>Base Stat {value.base_stat}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* upper */}
          <div className='space-x-2'>
            <div className='font-bold'>Moves: </div>{pokemonData.moves?.map(({ move }, index, arr) => (
              <p key={move.name} className='inline-block'>{move.name}{index === arr.length - 1 ? ('') : (',')}</p>
            ))}
          </div>

        </div>

      </div>
    )
  }

  const handleDetail = () => {
    setShowMore(!showMore)
  }

  return (
    <div className='flex flex-col text-md font-mono justify-start items-center bg-black/60 overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full h-full '>
      <div className='flex flex-col justify-center items-center p-4 m-2 w-auto h-auto bg-slate-100 rounded-md border-2 border-black capitalize'  >
        {pokemonData ? (
          !showMore ?
            (<MinimalDetail />)
            :
            (<FullDetail />)
        ) : ('')}
        <button
          className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xl py-1 px-4 m-1 mt-3 rounded-lg'
          onClick={handleDetail}
        >
          {showMore ? 'Less Detail' : 'More Detail'}
        </button>
        <button onClick={() => setOpenModal(false)} className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-2xl py-2 px-8 m-2 rounded-lg'>Close</button>
      </div>
    </div >
  )
}

export default Pokemon