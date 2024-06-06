import React, { useEffect, useState } from 'react'

const Pokemon = () => {
    const [pokemon , setPokemon] = useState([])
    const [ranNum , setRanNum] = useState(0)
    const [randomPokemon, setRandomPokemon] = useState(null);
    const [loading, setLoading] = useState(true)
    const [detailsLoading, setDetailsLoading] = useState(false)
    const pokeApi = "https://pokeapi.co/api/v2/pokemon?limit=200"
    const typeColors = {
        fire: "bg-red-500",
        water: "bg-blue-500",
        grass: "bg-green-500",
        electric: "bg-yellow-500",
        psychic: "bg-pink-500",
        ice: "bg-blue-200",
        dragon: "bg-purple-500",
        dark: "bg-gray-800",
        fairy: "bg-pink-300",
        normal: "bg-gray-400",
        fighting: "bg-orange-700",
        flying: "bg-indigo-300",
        poison: "bg-purple-700",
        ground: "bg-yellow-700",
        rock: "bg-yellow-900",
        bug: "bg-green-700",
        ghost: "bg-purple-900",
        steel: "bg-gray-500",
      };
    useEffect(() => {
        const fetchpokemon = async () => {
             try {
                const response = await fetch(pokeApi)
                const data = await response.json()
                setPokemon(data.results)
                setLoading(false);
             } catch (error) {
                console.log(error)
             }
        }
        fetchpokemon()
    },[])
    
    useEffect(() => {
        if (ranNum !== null){
        const fetchURL = async () => {
            try {
                const response = await fetch(pokemon[ranNum].url)
                const data = await response.json()
                setRandomPokemon(data)
                setDetailsLoading(false)
            } catch (error) {
                console.log(error)
            }
        }
          fetchURL()
    }
    },[ranNum, pokemon])




    const handleRandomPoke = () => {
        if (pokemon.length > 0) {
            setRanNum(Math.floor(Math.random() * pokemon.length));
        }
    };

    return (
        <>
            {loading ? ( <progress className="progress w-56"></progress> ) :
            (<div className="card lg:card-side bg-base-100 shadow-xl  w-2/4  bg-slate-300">
                {randomPokemon && (
                    <>
                        <figure className=''><img className='w-64 object-contain' src={randomPokemon.sprites.front_default} alt="Pokemon"/></figure>
                        <div className="card-body">
                            <h2 className='font-bold text-4xl '>Name : {randomPokemon.name}</h2>
                            <h3 className="card-title">
                                Abilities : {randomPokemon.abilities.map((ability) => ability.ability.name).join(', ')}
                            </h3>
                            <p>Types : {randomPokemon.types.map((type) => type.type.name).join(', ')}</p>
                            <div className="card-actions">
                                <button onClick={handleRandomPoke} className="btn btn-primary " disabled={detailsLoading} >{detailsLoading ? <span  className="loading loading-spinner"></span> : "Random Pokemon !!"} </button>
                            </div>
                        </div>
                    </>
                )}
            </div>) }
        </>
    );
};
export default Pokemon 
