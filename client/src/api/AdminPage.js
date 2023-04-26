const BASE_URL = "http://localhost:3001/api";

export const getSomething = async (params) => {
	try {
		const response = await fetch(`${BASE_URL}/endpoint`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();

		console.log("getSomething ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getAll = async () => {
	try {
		const response = await fetch(`${BASE_URL}/endpoint`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();

		console.log("getAll ", result);
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
