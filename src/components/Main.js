import "../App.css";
import Container from "react-bootstrap/Container";
import Pokemon from "./Pokemon";
import { useEffect, useState } from "react";
import { pokemonAPI } from "../api/api";
import axios from "axios";

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  useEffect(() => {
    pokemonAPI
      .get("pokemon")
      .then((response) => {
        const pokemons = response.data.results;
        pokemons.forEach((pokemon) => {
          axios
            .get(pokemon.url)
            .then((response) => {
              const pokemonData = response.data;
              pokemon.image = pokemonData.sprites.front_default;
              setPokemonList([...pokemons]);
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <Container className="pokemons-list">
      {pokemonList.map((pokemon, index) => (
        <Pokemon key={index} name={pokemon.name} image={pokemon.image} />
      ))}
    </Container>
  );
}
export default Main;
