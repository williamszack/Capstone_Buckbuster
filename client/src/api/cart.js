//const BASE_URL = 'http://localhost:3001/api'
//const response = await fetch(`${BASE_URL}/cart/1`)

export const getUsersCart = async () => {
    try {
const response = await fetch('http://localhost:3001/api/cart/2', {
    headers: {
        'Content-Type': 'application/json'
    }
});
const result = await response.json()
console.log(result)
return result
    } catch (err) {
        console.error(err)
    }
}
