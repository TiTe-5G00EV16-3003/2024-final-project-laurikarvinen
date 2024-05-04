import { useContext, useState } from 'react';
import { useMutation } from 'react-query';

import Button from '../../shared/components/Button';
import Card from '../../shared/components/Card';
import Modal from '../../shared/components/Modal';
import { AuthContext } from '../../shared/context/auth-context';

import { deleteItem } from '../api/items';
import './Item.css';

const Item = props => {

  const auth = useContext(AuthContext);

  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const showConfirmationHandler = () => setShowConfirmationModal(true);
  const cancelConfirmationHandler = () => setShowConfirmationModal(false);

  const deleteCityMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    }
  })

  const deleteConfirmedHandler = () => {
    setShowConfirmationModal(false);
    deleteCityMutation.mutate({
      id: props.id,
      token: auth.token
    })
  }

  return (
    <>
      <Modal
        show={showConfirmationModal}
        header="Are you sure?"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button inverse onClick={cancelConfirmationHandler}>Cancel</Button>
            <Button danger onClick={deleteConfirmedHandler}>Delete</Button>
          </>
        }
      >
        <p>Are you sure? Once its gone, its gone!</p>
      </Modal>
      <li className='item'>
      <Card className='item__content'>
      <div className='item__image'>
        <img src={props.image} alt={props.name}/>
      </div>
      <div className='item__info'>
        <h3>{props.name} - {props.description} Price: {props.price} Owner: {props.owner}</h3>
      </div>
      <div className='item__actions'>

      {auth.isLoggedIn && (

        <Button>Edit</Button>
      )}
      { auth.isLoggedIn && (
              <Button danger onClick={showConfirmationHandler}>Delete</Button>
            )}
      </div>
      </Card>
    </li>

    </>
  )
}

export default Item;