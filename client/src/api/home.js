export const getAllProducts = async () => {
    try {
        const response = await fetch(
            `http://localhost:3001/api/products`, {
              headers: {
                'Content-Type': 'application/json'
              }
            })
            const result = await response.json()
            console.log(result)
            return result
    } catch (error) {
      console.error(error)
    }
     
}