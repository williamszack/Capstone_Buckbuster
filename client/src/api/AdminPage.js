const BASE_URL = "http://localhost:3001/api";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NCwidXNlcm5hbWUiOiJldmFuIiwiaWF0IjoxNjgyNjQ3NjI0fQ.S513ZtZ31muiBnN1yz7Vze5_eBDiryOINCH3IeWKcUM";

export const getAllUsers = async () => {
	try {
		const response = await fetch(`${BASE_URL}/users/admin`, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
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

export const addProduct = async ({ name, description, price, genre, quantity, image, active }) => {
	try {
		const response = await fetch(`${BASE_URL}/products`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify({
				name: name,
				description: description,
				price: price,
				genre: genre,
				quantity: quantity,
				image_url: image,
				active: active,
			}),
		});
		const result = await response.json();
		console.log("addNewProduct ", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};
