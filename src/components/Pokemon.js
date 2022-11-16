function Pokemon(props) {
  return (
    <div>
      <img src={props.image} alt={props.name + " Image"} />
      <div> {props.name}</div>
    </div>
  );
}
export default Pokemon;
