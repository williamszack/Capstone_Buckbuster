export const getAllProducts = async () => {
    try {
        const response = await fetch(
            `http://localhost:3001/api/products`, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const result = await response.json()
            
            return result
    } catch (error) {
      console.error(error)
    }
     
}

export const addProductToUsersCart = async (product_id, user_id) => {
    
  try {
      const response = await fetch ('http://localhost:3001/api/cart', {
          method: "POST",
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({
              user_id,
              product_id
          })
      })

      const result = await response.json()
      return result

  } catch (err) {
      console.error(err)
  }
}