import axios from 'axios';
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'


function Pokemon() {

  const params = useParams()
  const API = `https://pokeapi.co/api/v2/pokemon/${params.pokemonName}`
  const [pokemon, setPokemon] = useState({})
  const [showMore, setShowMore] = useState(false)

  useEffect(() => {
    axios.get(API).then(({ data }) => setPokemon(data))
  }, [])

  const MinimalDetail = () => {
    return (
      <div className='flex flex-col justify-center items-center px-2 w-60'>
        <img src={pokemon.sprites?.front_default} className='w-40' alt={pokemon.name} />
        <div className='self-start'>
          <div><p className='font-bold'>Name:</p>{pokemon.name}</div>
          <div><p className='font-bold'>Height:</p>{pokemon.height}</div>
          <div><p className='font-bold'>Weight:</p>{pokemon.weight}</div>

          <div className='space-x-2'>
            <div className='font-bold'>Ability: </div>{pokemon.abilities?.map(({ ability }, index, arr) => (
              <p key={ability.name} className='inline-block' > {ability.name}{index === arr.length - 1 ? ('') : (',')} </p>
            ))}
          </div>

          <div className='space-x-2'>
            <div className='font-bold'>Type: </div>{pokemon.types?.map(({ type }, index, arr) => (
              <p key={type.name} className='inline-block'>{type.name}{index === arr.length - 1 ? ('') : (',')}</p>
            ))}
          </div>

        </div>

        <button
          className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xl py-1 px-4 m-1 rounded-lg'
          onClick={handleDetail}
        >
          More Detail
        </button>
      </div>
    )
  }

  // const arrWord = ['abilities', 'forms', 'game_indices', 'held_items', 'moves', 'past_types', 'stats', 'types']
  // const objWord = ['species', 'sprites']

  const FullDetail = () => {
    return (
      <>
        <div className='flex flex-col justify-center items-center px-4 w-auto' >
          {/* {Object.entries(pokemon).map(([index, value]) => (
            <div className='space-x-2' key={index}>
              <div className='font-bold'>{index}: </div>
              <div>
                {console.log(value)}
                {arrWord.includes(index)
                  ? (
                    // console.log(index + ' : true')
                    <div className='space-x-2'>
                      {value?.map(value => (
                        console.log(value)
                        // <p className='space-x-2'>{value}</p>
                      ))}
                    </div>
                  ) : (
                    console.log(index + ' : false')
                  )
                }
              </div>
            </div>
          ))} */}
          <img src={pokemon.sprites?.front_default} className='w-40' alt={pokemon.name} />
          <div>

            <div className='space-x-2'>
              <div className='font-bold'>Weight:</div><p className='space-x-2'>{pokemon.weight}</p>
            </div>
            <div className='space-x-2'>
              <div className='font-bold'>Height:</div><p className='space-x-2'>{pokemon.height}</p>
            </div>

            <div className='space-x-2'>
              <div className='font-bold'>Ability: </div>{pokemon.abilities?.map(({ ability }, index, arr) => (
                <p key={ability.name} className='inline-block' > {ability.name}{index === arr.length - 1 ? ('') : (',')} </p>
              ))}
            </div>

            <div className='space-x-2'>
              <div className='font-bold'>Type: </div>{pokemon.types?.map(({ type }, index, arr) => (
                <p key={type.name} className='inline-block'>{type.name}{index === arr.length - 1 ? ('') : (',')}</p>
              ))}
            </div>

            <div className='space-x-2'>
              <div className='font-bold'>Moves: </div>{pokemon.moves?.map(({ move }, index, arr) => (
                <p key={move.name} className='inline-block'>{move.name}{index === arr.length - 1 ? ('') : (',')}</p>
              ))}
            </div>

            <div className='space-x-2'>
              <div className='font-bold'>Stats:</div> {pokemon.stats?.map((value, index, arr) => (
                <div key={value.stat.name} className='inline-block flex flex-col items-start mx-2'><p className='font-bold inline-block'>{value.stat.name} :</p>Base Stat {value.base_stat}</div>
              ))}
            </div>

            <button
              className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-xl py-1 px-4 m-1 rounded-lg'
              onClick={handleDetail}
            >
              Less Detail
            </button>

          </div>

        </div>
      </>
    )
  }

  const handleDetail = () => {
    setShowMore(!showMore)
  }

  // console.log(pokemon);

  const navigate = useNavigate()

  return (
    <div className='flex flex-col text-md font-mono justify-center items-center'>
      <div className='flex flex-col justify-center items-center p-4 m-2 w-auto bg-slate-100 rounded-md border-2 border-black capitalize'  >
        {pokemon ? (
          !showMore ?
            (<MinimalDetail />)
            :
            (<FullDetail />)
        ) : ('')}
      </div>

      <div className='m-4'>
        <button onClick={() => navigate(-1)} className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-2xl py-2 px-8 m-2 rounded-lg'>Back</button>
      </div>

    </div >
  )
}

export default Pokemon