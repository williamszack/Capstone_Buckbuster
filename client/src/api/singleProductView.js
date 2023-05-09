export const getSingleProduct = async (product_id) => {

    try {
        const response = await fetch(
            `http://localhost:3001/api/products/${product_id}`, {
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

export const getProductReview = async (product_id) => {
    try {
        const response = await fetch(
        `http://localhost:3001/api/products/${product_id}/reviews`, {
            headers: {
                'Content-Type': 'application/json'
            }
        })

        const result = await response.json()
        return result
    } catch (err) {
        console.error(err)
    }
}