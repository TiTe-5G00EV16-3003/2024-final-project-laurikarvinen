import { useContext, useState } from 'react';
import { useMutation } from 'react-query';

import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import { AuthContext } from '../../shared/context/auth-context';
import EditForm from './EditForm';

import { deleteItem, updateItem } from '../api/items';
import './Item.css';

const Item = props => {
  const auth = useContext(AuthContext);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [editMode, setEditMode] = useState(false);

  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);
  const startEditHandler = () => setEditMode(true);
  const stopEditHandler = () => setEditMode(false);

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      console.log('Item deleted');
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const updateItemMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      console.log('Item updated');
      stopEditHandler();
    },
    onError: (error) => {
      console.error(error);
    }
  });

  const saveUpdatedItem = (updatedData) => {
    updateItemMutation.mutate({
      item: updatedData,
      token: auth.token
  });
};

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    deleteItemMutation.mutate({ id: props.id, token: auth.token });
  };

  return (
    <>
      {/* ... */}
      {editMode ? (
        <EditForm item={props} onSave={saveUpdatedItem} />
      ) : (
        <li className='item'>
          <Card className='item__content'>
            <div className='item__image'>
              <img src={props.image} alt={props.name} />
            </div>
            <div className='item__info'>
              <div className="item__name-and-description">
                <h3>{props.name}</h3>
                <p>{props.description}</p>
              </div>
              <div className="item__price">Price: {props.price}€</div>
              <div className="item__owner">Owner: {props.owner}</div>
            </div>
            <div className='item__actions'>
              {auth.isLoggedIn && (
                <>
                  <Button onClick={startEditHandler}>Edit</Button>
                  <Button danger onClick={showConfirmationHandler}>Delete</Button>
                </>
              )}
            </div>
          </Card>
        </li>
      )}
    </>
  );
}


export default Item;
