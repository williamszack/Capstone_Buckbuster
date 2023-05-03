const BASE_URL = "http://localhost:3001/api";
const token =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MywidXNlcm5hbWUiOiJldmFuIiwiaWF0IjoxNjgzMTQ0NzQyfQ.rcKjfpNiFDU8e-2x7yWr5urHks081ODDgqFq1uPLGJA";

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
		// console.log("getAllUsers ", result);
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
		// console.log("getAllOrders ", result);
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
		console.log("getAllProducts:", result);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const updateProduct = async ({
	name,
	description,
	price,
	genre,
	quantity,
	image,
	active,
}) => {
	try {
		const response = await fetch(`${BASE_URL}/products/:product_id`, {
			method: "PATCH",
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
		console.log("updateProduct:", updateProduct);
		return result;
	} catch (error) {
		console.error(error);
	}
};

export const deactivateProduct = async ({ productId }) => {
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

//product selector for dropdown menu
// const handleProductChange = (event) => {
//   const productId = parseInt(event.target.value);
//   const selectedProduct = allProducts.find(product => product._id === productId);
//   setSelectedProduct(selectedProduct);
// };

//product selector for dropdown menu
// const productOptions = allProducts.sort((a, b) => a.product_id - b.product_id).map((product) => (
//   <option key={product._id} value={product._id}>{product.product_id} - {product.name} -
//   <span>{product.active ? <span className="product-active-indicator">&nbsp;active</span>
//   : <span className="product-inactive-indicator">&nbsp;inactive</span>}</span></option>
// ));

// {selectedProduct && (
// 	<div>
// 	  <p>Product Name: {selectedProduct.product_id}</p>
// 	  <span>Active: {selectedProduct.active ? <span>&nbsp;Yes</span> : <span>&nbsp;No</span>}</span>
// 	</div>
//   )}
