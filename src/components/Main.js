import "../App.css";
import Container from "react-bootstrap/Container";
import Pokemon from "./Pokemon";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useEffect, useState } from "react";
import { pokemonAPI } from "../api/api";
import Arrow from "../assets/right-arrow.png";
import LoadingGif from "../assets/loading-pac.gif";
import axios from "axios";

function Main() {
  const [pokemonList, setPokemonList] = useState([]);
  const [APILink, setAPILink] = useState(
    "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20"
  );
  const [prevPage, setPrevPage] = useState("");
  const [nextPage, setNextPage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const callPrevPage = (event) => {
    if (prevPage) {
      setIsLoading(true);
      setAPILink(prevPage);
    }
  };
  const callNextPage = (event) => {
    if (nextPage) {
      setIsLoading(true);
      setAPILink(nextPage);
    }
  };
  const changePagination = (number) => {
    setAPILink(`https://pokeapi.co/api/v2/pokemon/?offset=0&limit=${number}`);
  };

  useEffect(() => {
    //Using useEffect hook to get the current list
    pokemonAPI
      .get(APILink)
      .then((response) => {
        const pokemons = response.data.results;
        setPrevPage(response.data.previous);
        setNextPage(response.data.next);

        pokemons.forEach((pokemon, index) => {
          axios
            .get(pokemon.url)
            .then((response) => {
              const pokemonData = response.data;
              let dataImage = pokemonData.sprites.front_default;
              if (!dataImage) {
                dataImage = pokemonData.sprites.front_shiny;
              }
              pokemon.image = dataImage;
              setPokemonList([...pokemons]);
              if (index + 1 == pokemons.length) {
                setTimeout(() => {
                  setIsLoading(false);
                }, 500);
              }
            })
            .catch((err) => console.log(err));
        });
      })
      .catch((err) => console.log(err));
  }, [APILink]);

  return (
    <>
      {isLoading && (
        <div className="loading-div">
          <img src={LoadingGif} alt="Loafing Gif" />
        </div>
      )}
      <Container>
        <div className="dropdown-btn">
          <DropdownButton variant="info" title="Pokemons per page">
            <Dropdown.Item eventKey="1" onClick={() => changePagination(10)}>
              10
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => changePagination(20)}>
              20
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => changePagination(30)}>
              30
            </Dropdown.Item>
            <Dropdown.Item eventKey="2" onClick={() => changePagination(40)}>
              40
            </Dropdown.Item>
          </DropdownButton>
        </div>
        <div className="pokemons-list">
          {pokemonList.map((pokemon, index) => (
            <Pokemon key={index} name={pokemon.name} image={pokemon.image} url={pokemon.url} />
          ))}
        </div>
        {prevPage && (
          <span
            className="pagination-btn pagination-btn-prev"
            onClick={callPrevPage}
          >
            <img src={Arrow} alt="Prev button" />
          </span>
        )}
        {nextPage && (
          <span
            className="pagination-btn pagination-btn-next"
            onClick={callNextPage}
          >
            <img src={Arrow} alt="Next button" />
          </span>
        )}
      </Container>
    </>
  );
}
export default Main;
