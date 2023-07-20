const BASE_URL = "http://localhost:3001/api/";

//creates a new account
export async function createAccount(username, password, email, name) {
  const credentials = JSON.stringify({
    username: username,
    password: password,
    email: email,
    name: name,
  });

  fetch(`${BASE_URL}/users/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: credentials,
  })
    .then((response) => response.json())
    .then((result) => {
      console.log("You successfully registered an account", result);
      // alert(result.message);
    })
    .catch(console.error);
}
