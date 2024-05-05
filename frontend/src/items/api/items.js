export const getItems = async () => {
  
  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/items`
  );
  return await response.json();
};

export const addItem = async ({name, description, owner, price, image, token}) => {
  console.log("Sending data:", {name, description, owner, price, image});
  const response = await fetch(`http://localhost:5000/api/items`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token

      
    },
    body: JSON.stringify({
      name,
      description,
      owner,
      price,
      image
    })
  });

  
  return await response.json();
};

export const deleteItem = async({id, token}) => {
  const response = await fetch(`http://localhost:5000/api/items/${id}`
  , {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  return await response.json();
};

export const updateItem = async ({item, token}) => {
  console.log('Updating item with id:', item.id); 
  try {

    const response = await fetch(`http://localhost:5000/api/items/${item.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token
      },
      body: JSON.stringify(item)
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Failed to update item:', errorData);
      throw new Error('Failed to update item');
    }
    return await response.json(); 
  } catch (error) {
    console.error('Update failed:', error);
    throw error;
  }
};

