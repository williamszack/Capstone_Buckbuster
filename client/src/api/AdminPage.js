const BASE_URL = "http://localhost:3001/api";
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJrZW50IiwiaWF0IjoxNjgyNTYzMTYzfQ.U9-ISxYwTuNl0jIzhrn4SkEojnpNWsw1yfqZdBJBloI"

export const getAllUsers = async () => {
	try {
		const response = await fetch(`${BASE_URL}/users/admin`, {
			method: "GET",
			// headers: {
			// 	"Content-Type": "application/json",
			// 	Authorization: `Bearer ${token}`,
			// },
		});
		const result = await response.json();

		console.log("getAllUsers ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getAllOrders = async () => {
	try {
		const response = await fetch(`${BASE_URL}/orders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();

		console.log("getAllOrders ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const something = async ({ token, routineName, goal, isPublic }) => {
	// const capitalizedStr = str.charAt(0).toUpperCase() + str.slice(1);
	try {
		const response = await fetch(`${BASE_URL}/routines`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: routineName.charAt(0).toUpperCase() + routineName.slice(1),
				goal: goal.charAt(0).toUpperCase() + goal.slice(1),
				isPublic: isPublic,
			}),
		});
		const result = await response.json();
		console.log("something ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};
