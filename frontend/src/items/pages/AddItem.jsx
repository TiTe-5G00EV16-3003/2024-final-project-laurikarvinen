import { useContext, useRef } from "react";
import { useMutation } from "react-query";
import { useHistory } from 'react-router-dom';
import Button from "../../shared/components/Button";
import Input from "../../shared/components/Input";
import { AuthContext } from "../../shared/context/auth-context";
import { addItem } from "../api/items";
import './AddItem.css';

const AddItem = () => {
  const history = useHistory();
  const nameRef = useRef();
  const priceRef = useRef();
  const imageRef = useRef();
  const descriptionRef = useRef();
  const ownerRef = useRef();
  const auth = useContext(AuthContext);
  const createItemMutation = useMutation(addItem, {
    onSuccess: () => {
      history.push('/');
    },
    onError: (error) => {
      // Handle error state, e.g., show an alert or set error message in state
      alert("Error adding item: " + error.message);
    }
  });
  const itemSubmitHandler = async (event) => {
    event.preventDefault();
    createItemMutation.mutate({
      name: nameRef.current.value,
      description: descriptionRef.current.value,
      owner: ownerRef.current.value,
      price: priceRef.current.value,
      image: imageRef.current.value,
      token: auth.token
    });
  };
 
  return (
<form className="item-form" onSubmit={itemSubmitHandler}>
<Input ref={nameRef} type="text" label="Item Name" />
<Input ref={descriptionRef} type="text" label="Description" />
<Input ref={ownerRef} type="text" label="Owner" />
<Input ref={priceRef} type="text" label="Price" />
<Input ref={imageRef} type="text" label="Image Link" />
<Button type="submit" disabled={createItemMutation.isLoading}>
        Add item
</Button>
</form>
  )
}

export default AddItem;


