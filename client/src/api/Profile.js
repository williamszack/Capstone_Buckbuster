export const getUsersOrders = async () => {
    const token = localStorage.getItem("token")
    const user_id = localStorage.getItem("user_id")
    try {
        const response = await fetch(`http://localhost:3001/api/orders/${user_id}`, { 
            method: "GET",
            headers: {
                'Content-Type': 'application/json', 
                'Authorization': `Bearer ${token}` 
            }

        })
        const result = await response.json()
        return result

    } catch (error) {
      console.log(error)
    }
}