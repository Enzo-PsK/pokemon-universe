import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

function Pokemon(props) {
  //Capitalize the name's first letter
  const formatName = (str) =>
    `${str[0].toUpperCase()}${str.slice(1).toLowerCase()}`;
  //Some workarounds to get pokemon id and pass to specific component
  const pokemonUrl = props.url.slice(0, -1);
  const initIndex = pokemonUrl.lastIndexOf("/");
  const pokemonId = pokemonUrl.slice(initIndex + 1);
  return (
    <div>
      <Card>
        <Card.Img variant="top" src={props.image} alt={props.name + " Image"} />
        <Card.Body>
          <Card.Title>{formatName(props.name)}</Card.Title>
          <Button variant="primary">
            <Link className="text-white" to={`/detail/${pokemonId}`}>
              Know me!
            </Link>
          </Button>
        </Card.Body>
      </Card>
    </div>
  );
}
export default Pokemon;
