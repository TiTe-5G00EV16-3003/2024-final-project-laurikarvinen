import { useQuery } from "react-query";
import LoadingSpinner from "../../shared/components/LoadingSpinner";
import { getItems } from "../api/items";
import ItemsList from '../components/ItemsList';


const Items = () => {

  const {isLoading, error, data} = useQuery("itemsData", () => getItems());

  if (isLoading) {
    return (
      <div className="center">
        <LoadingSpinner/>
      </div>
    );
  }

  if (error) {
    return "An error has occurred: " + error.message;
  }

  return (
    <>
    <ItemsList items={data} />
    </>
  )
};


export default Items;