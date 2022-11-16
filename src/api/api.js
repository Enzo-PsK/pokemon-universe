import axios from "axios";

const pokemonAPI = axios.create();
pokemonAPI.defaults.baseURL = "https://pokeapi.co/api/v2/";

export { pokemonAPI };
