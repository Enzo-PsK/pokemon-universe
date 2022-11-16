import "../App.css";
import Container from "react-bootstrap/Container";
import Pokemon from "./Pokemon";
import { useEffect, useState } from "react";

function Favorites() {
  let localStorageItems = JSON.parse(localStorage.getItem("favPokemons")) || [];
  const [favsList, setfavsList] = useState([]);

  useEffect(() => {
    setfavsList(localStorageItems);
  }, []);
  return (
    <>
      <Container>
        <div className="favs-upper">My Favorite Pokemons</div>
        {favsList.length === 0 && (
            <h2 className="favs-empty">Sorry! It looks like you dont have any fav!</h2>
          )}
        <div className="pokemons-list">
          {favsList.map((item, index) => {
            return (
              <Pokemon
                key={index}
                name={item.name}
                image={item.image}
                url={`https://pokeapi.co/api/v2/pokemon/${item.id}/`}
              />
            );
          })}
        </div>
      </Container>
    </>
  );
}
export default Favorites;
