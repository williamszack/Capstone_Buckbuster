const BASE_URL = "http://localhost:3001/api";
//const token =
//	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJldmFuIiwiaWF0IjoxNjgzMTQ0NzQyfQ.rcKjfpNiFDU8e-2x7yWr5urHks081ODDgqFq1uPLGJA";



export const getAllUsers = async () => {
	const token = localStorage.getItem("token")
	try {
		const response = await fetch(`${BASE_URL}/users/admin`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		// console.log("getAllUsers ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getAllOrders = async () => {
	const token = localStorage.getItem("token")
	try {
		const response = await fetch(`${BASE_URL}/orders`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		// console.log("getAllOrders ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const addProduct = async ({ name, description, price, genre, quantity, image, active }) => {
	const token = localStorage.getItem("token")
	try {
		const response = await fetch(`${BASE_URL}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: name
					.split(" ")
					.map((title) => {
						return title.charAt(0).toUpperCase() + title.slice(1);
					})
					.join(" "),
				description: description.toUpperCase().charAt(0) + description.slice(1),
				price: price,
				genre: genre.toUpperCase().charAt(0) + genre.slice(1),
				quantity: quantity,
				image_url: image,
				active: active,
			}),
		});
		const result = await response.json();
		// console.log("addNewProduct ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const getAllProducts = async () => {
	
	try {
		const response = await fetch(`${BASE_URL}/products/`, {
			headers: {
				"Content-Type": "application/json",
			},
		});
		const result = await response.json();
		// console.log("getAllProducts:", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const updateProduct = async ({
	productId,
	name,
	description,
	price,
	genre,
	quantity,
	image,
	active,
}) => {
	const token = localStorage.getItem("token")
	try {
		// //create an object to hold the updated fields
		const body = {};
		if (name) {
			body.name = name;
		}
		if (description) {
			body.description = description;
		}
		if (price) {
			body.price = price;
		}
		if (genre) {
			body.genre = genre;
		}
		if (quantity) {
			body.quantity = quantity;
		}
		if (image) {
			body.image_url = image;
		}
		if (active !== undefined) {
			body.active = active;
		}
		const response = await fetch(`${BASE_URL}/products/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(body),
		});
		const result = await response.json();
		console.log("updateProduct:", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const deactivateProduct = async ({ productId }) => {
	const token = localStorage.getItem("token")
	try {
		const response = await fetch(`${BASE_URL}/products/deactivate/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		console.log("deactivateProduct:", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const reactivateProduct = async ({ productId }) => {
	const token = localStorage.getItem("token")
	try {
		const response = await fetch(`${BASE_URL}/products/reactivate/${productId}`, {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
		});
		const result = await response.json();
		console.log("reactivateProduct:", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};
