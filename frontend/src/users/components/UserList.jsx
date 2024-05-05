import Item from "../../items/components/Item";
import '../../items/components/ItemsList.css';

const ItemsList = props => {
  return (
    <ul className="items-list">
      {props.items.map((items) =>
        <Item
          key={items.id}
          name={items.name}
          description={items.description}
          owner={items.owner}
          price={items.price}
          image={items.image}
        />

        
      )}
    </ul>
  )
}
export default ItemsList;