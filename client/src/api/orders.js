export const submitOrder = async (user_id) => {
 
    try {
        const response = await fetch(`http://localhost:3001/api/orders/${user_id}`, { 
            method: "POST",
            headers: {
                'Content-Type': 'application/json'  
            }

        })
        const result = await response.json()
        return result

    } catch (error) {
      console.log(error)
    }
}

