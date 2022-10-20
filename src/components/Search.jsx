import { useObservableState } from "observable-hooks"
import { useMemo, useState } from "react"
import {  usePokemon } from "../store"
import { BehaviorSubject, map, combineLatestWith } from "rxjs";

const Deck = () => {
    const {selected$ , pokemon$ , deck$}= usePokemon()
    const deck = useObservableState(deck$, [])
    return (
        <div> <span>Deck</span>
            {deck.map(pokemon =>(
                <div>
                <img src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`} alt="" />
                <span>{pokemon.id}</span>
                <span>{pokemon.name}</span>
            </div>
            ))}
        </div>
    )
}


const Search = () => {

    const search$ = useMemo(() => new BehaviorSubject(""), []);
    const {selected$ , pokemon$ }= usePokemon()

    const [filteredPokemon] = useObservableState(
        () =>
          pokemon$.pipe(
            combineLatestWith(search$),
            map(([pokemon, search]) =>
              pokemon.filter((p) =>
                p.name.toLowerCase().includes(search.toLowerCase())
              )
            )
          ),
        []
      );

    return (
        <>
            <Deck/>
            <div>
                <input 
                    type="text"
                    value={search$.value}
                    onChange={(e) => search$.next(e.target.value)} 
                />
            </div>
            <div>
                {filteredPokemon.map(pokemon =>(
                    <div key={pokemon.id}>
                        <input 
                            type="checkbox" 
                            checked={pokemon.selected}
                            onChange={()=> {
                                if(selected$.value.includes(pokemon.id)) {
                                    selected$.next(selected$.value.filter(id => id !== pokemon.id))
                                } else {
                                    selected$.next([...selected$.value, pokemon.id])   
                                }
                            }}
                        />
                        <strong>{pokemon.name}</strong><span>{pokemon.power}</span>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Search