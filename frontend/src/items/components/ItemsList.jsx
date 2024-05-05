import Item from "./Item";
import './ItemsList.css';

const ItemsList = props => {
  return (
    <ul className="items-list">
      {props.items.map((item) => 
        <Item
          key={item.id}
          id={item.id} 
          name={item.name}
          description={item.description}
          owner={item.owner}
          price={item.price}
          image={item.image}
        />
      )}
    </ul>
  )
}
export default ItemsList;
