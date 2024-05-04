export const getItems = async () => {
  
  const response = await fetch(
  `${import.meta.env.VITE_API_URL}/api/items`
  );
  return await response.json();
};

export const addItem = async ({name, description, owner, price, image, token}) => {
  console.log("Sending data:", {name, description, owner, price, image});
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items`, {
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
  const response = await fetch(`${import.meta.env.VITE_API_URL}/api/items/${id}`
  , {
    method: 'DELETE',
    headers: {
      'Accept': 'application/json',
      'Authorization': 'Bearer ' + token
    }
  })
  return await response.json();
};


