import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Pokemon from './Pokemon';

const typesAPI = `https://pokeapi.co/api/v2/type`

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

const Filter = () => {

    const [types, setTypes] = useState([])
    const [pokemonType, setPokemonType] = useState([])
    const [pokemonPics, setPokemonPics] = useState([])
    const [openModal, setOpenModal] = useState(false)
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        axios.get(typesAPI).then(({ data }) => {
            setTypes(data.results)
        })
    }, [])

    const handleFilter = async (url) => {
        await axios.get(url)
            .then(({ data }) => {
                axios.all(
                    data.pokemon?.map(async ({ pokemon }) => (
                        await axios.get(pokemon.url)
                    ))
                ).then(axios.spread((...data) => {
                    setPokemonPics(data);
                }))
                setPokemonType(data)
            })
    }

    const onClickPokemon = async (pokemonURL) => {
        await axios.get(pokemonURL).then(({ data }) => {
            setPokemon(data)
        })
        setOpenModal(true)
    }

    return (
        <div className='w-fit flex flex-col justify-center items-center rounded-md bg-slate-100 m-8 text-xl font-mono '>
            <div className='grid grid-rows-2 md:grid-rows-4 grid-cols-2 md:grid-cols-4 gap-4 md:gap-2 p-2 '>
                {types ? (types.map((type) => (
                    <button key={type.name} onClick={() => handleFilter(type.url)} style={{ backgroundColor: colours[type.name] }} className={`bg-blue-600 hover:bg-blue-500 active:bg-blue-700 flex justify-center items-center text-white text-2xl font-mono py-2 px-8 m-2 rounded-lg capitalize`}>
                        {type.name}
                    </button>
                ))) : ('')}
            </div>

            {/* Modal */}
            {openModal ? (
                <Pokemon setOpenModal={setOpenModal} pokemonData={pokemon} />
            ) : ('')}
            {/* Modal */}

            <div className='flex flex-row flex-wrap justify-center items-center p-2 m-2'>
                {pokemonType ? pokemonType.pokemon?.map(({ pokemon }, index) => (
                    <div key={pokemon.name}>
                        <button
                            onClick={() => onClickPokemon(pokemon.url)}
                            className='hover:border-x-2 hover:border-gray-400 hover:bg-gray-200 active:bg-gray-300 rounded m-1 p-4 w-64 flex flex-col text-center justify-center items-center text-xl font-mono capitalize'
                        >
                            <img src={pokemonPics[index]?.data.sprites.front_default} alt={pokemon.name} />
                            {pokemon.name}
                        </button>
                    </div>
                )) : ('')}
            </div>

            <div className='m-4'>
                <Link to="/" className='bg-blue-600 hover:bg-blue-500 active:bg-blue-700 text-white text-2xl py-2 px-8 m-2 rounded-lg'>Back</Link>
            </div>
        </div>

    )
}

export default Filter