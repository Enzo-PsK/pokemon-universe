import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import axios from "axios";
import Container from "react-bootstrap/Container";
import sampleData from "../api/sampleData";
import FavFilled from "../assets/fav-filled.png";
import FavWhite from "../assets/fav-white.png";

function Detail(props) {
  let { id } = useParams();
  //Capitalize the name's first letter
  const formatName = (str) => {
    if (str) {
      return `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
    }
  };
  //Handles the fav icon click event
  const addToFavorites = () => {
    let localStorageItems =
      JSON.parse(localStorage.getItem("favPokemons")) || [];
    const pokemon = {
      id: id,
      name: pokemonData.name,
      image: pokemonData.sprites.front_default,
    };
    const repeated = localStorageItems.filter((item) => {
      if (item.id == pokemon.id) {
        let index = localStorageItems.indexOf(item);
        localStorageItems.splice(index, 1);
        setIsFavorited(false);
        return item;
      }
    });
    if (repeated.length === 0) {
      localStorageItems.push(pokemon);
      setIsFavorited(true);
    }
    localStorage.setItem("favPokemons", JSON.stringify(localStorageItems));
  };
  //Check if this pokemon is already on fav list
  const isOnFavsList = (id) => {
    let bool;
    let localStorageItems =
      JSON.parse(localStorage.getItem("favPokemons")) || [];
    const repeated = localStorageItems.filter((item) => {
      if (item.id == id) {
        bool = true;
        return item;
      }
    });
    if (repeated.length === 0) {
      bool = false;
    }
    return bool;
  };

  const [pokemonData, setPokemonData] = useState(sampleData);
  const [isFavorited, setIsFavorited] = useState(false);

  useEffect(() => {
    setIsFavorited(isOnFavsList(id));
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then((response) => {
        let pokemonData = response.data;
        setPokemonData(pokemonData);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Container className="detail-page">
      <Card>
        <Card.Img
          variant="top"
          src={pokemonData.sprites.front_default}
          alt={pokemonData.name + " Image"}
        />
        <Card.Body>
          <Card.Title>
            {formatName(pokemonData.name)}{" "}
            <img
              onClick={addToFavorites}
              className="fav-icon"
              src={isFavorited ? FavFilled : FavWhite}
            />
          </Card.Title>
          <Card.Text>
            {pokemonData.stats.map((item, index) => {
              return (
                <span key={index}>
                  {formatName(item.stat.name)} :{item.base_stat}
                </span>
              );
            })}
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
}

export default Detail;
