// export const getUsersCart = async () => {
//     const user_id = localStorage.getItem("user_id")

//     try {
// const response = await fetch(`http://localhost:3001/api/users/${user_id}`, {
//     headers: {
//         'Content-Type': 'application/json'
//     }
// });

// const result = await response.json()
// console.log(result)
// return result
//     } catch (err) {
//         console.error(err)
//     }
// }