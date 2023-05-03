import '../css/AdminPage.css'
import { useCallback, useEffect, useState, Fragment } from 'react'
import { addProduct, deactivateProduct, getAllOrders, getAllProducts, getAllUsers, reactivateProduct } from '../api/AdminPage'

//child of App.js

const AdminPage = ({ token }) => {

//View all users - done
  const [allUsers, setAllUsers] = useState([]);

  //*fetch all users
  const fetchAllUsers = useCallback(async () => {
    const result = await getAllUsers();
    setAllUsers(result);
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers])

  // console.log("allusers", allUsers);
  
//View all orders - done
  const [allOrders, setAllOrders] = useState([]);

  //fetch all orders
  const fetchAllOrders = useCallback(async () => {
    const result = await getAllOrders();
    setAllOrders(result);
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);

  // console.log("allorders", allOrders);
  
  const ordersByDate = allOrders.reduce((accumulator, order) => {
    const date = order.order_date;
    if (accumulator[date]) {
      accumulator[date].push(order);
    } else {
      accumulator[date] = [order];
    }
    return accumulator;
  }, {});

//Add product - done
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [genre, setGenre] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [active, setActive] = useState(true);
  
  const handleAdd = async (event) => {
    event.preventDefault();

    const result = await addProduct({ name, description, price, genre, quantity, image, active });
    const message = result.error ? `Error ${result.message}` : `Product added to library`
    setName("");
    setDescription("");
    setPrice("");
    setGenre("");
    setQuantity("");
    setImage("");
    console.log(message);
    alert(message)
  }
  
  // console.log("active value", active);

  //------------------------------------------------------------------------------------
  //helper for bottom 3 functions
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  const [products, setProducts] = useState(allProducts);
  
  const fetchAllProducts = useCallback(async () => {
    const result = await getAllProducts();
    setAllProducts(result);
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts])

  const handleOptionChange = (event) => {
    const productId = parseInt(event.target.value);
    const selectedProduct = allProducts.find(product => product.product_id === productId);
    setSelectedProduct(selectedProduct);
    console.log("selected product:", selectedProduct, "selected Id:", productId);
  };

  const productOptions = allProducts ? allProducts.sort((a, b) => a.product_id - b.product_id).map(product => (
    <option key={product._id} value={product.product_id}>{product.product_id} - {product.name} - 
    <span>{product.active ? <span className="product-active-indicator">&nbsp;active</span> 
    : <span className="product-active-indicator">&nbsp;inactive</span>}</span></option>
  )) : null;


//Update product

//Deactivate product
const handleDeact = async (productId) => {
  if(!selectedProduct.active) {
    alert("product already inactive");
    return;
  } else if (!productId) {
    alert("Please select a product");
  }
  await deactivateProduct({ token, productId });
  alert(`Product ID: ${selectedProduct.product_id} deactivated`)
  
  //refresh product list after deactivation
  const updatedProducts = await fetchAllProducts(); // Fetch updated data
  setAllProducts(updatedProducts); // Update state with new data
  setSelectedProduct(null);
};

//Reactivate product
const handleReact = async (productId) => {
  if(selectedProduct.active) {
    alert("product already active");
    return;
  } else if (!productId) {
    alert("Please select a product");
  }
  await reactivateProduct({ token, productId });
  alert(`Product ID: ${selectedProduct.product_id} reactivated`)
  setSelectedProduct([]);
};


  return (
    <div>
      <h1>AdminPage</h1>
      <h2>Users</h2>
      <ul className="user-table">
      <div className="user-table-header">
        <p><strong>User ID</strong></p>
        <p><strong>Name</strong></p>
        <p><strong>Email</strong></p>
        <p><strong>Username</strong></p>
        <p><strong>Password</strong></p>
        <p><strong>Admin</strong></p>
      </div>
      {allUsers.map((user) => (
        <li key={user._id} className={user.admin === true ? "admin-row user-table-row" : "user-table-row"}>
          <p>{user.user_id}</p>
          <p>{user.name}</p>
          <p>{user.email}</p>
          <p>{user.username}</p>
          <p>{user.password}</p>
          <span>{user.admin === true ? <span>&nbsp;Yes</span> : <span>&nbsp;No</span>}</span>
        </li>
        ))}
      </ul>
      <br />
      <h2>Orders</h2>
      <ul className="orders-table">
      <div className="orders-table-header">
        <p><strong>Order Date</strong></p>
        <p><strong>Order ID</strong></p>
        <p><strong>Name</strong></p>
        <p><strong>User ID</strong></p>
        <p><strong>Product ID</strong></p>
        <p><strong>Quantity</strong></p>
        {/* <p><strong>Order Date</strong></p> */}
      </div>
      {Object.keys(ordersByDate).map((date, index) => (
      <Fragment key={date}>
        <li className="date-row">
          {/* <p><strong>Order Date: </strong>{date}</p> */}
        </li>
      {ordersByDate[date].map((order, orderIndex) => (
        <li key={order._id} className={`order-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
          <p className={`date ${orderIndex === 0 ? 'bold-date' : 'rest-date'}`}>{date}</p>
          <p>{order.order_id}</p>
          <p>{order.name}</p>
          <p>{order.user_id}</p>
          <p>{order.product_id}</p>
          <p>{order.quantity}</p>
          {/* <p>{order.order_date}</p> */}
        </li>
      ))}
      </Fragment>
      ))}
      </ul>
      <h2>Add Product</h2>
      <div>
        <form onSubmit={handleAdd} id="add-form">
          <input type="text" required placeholder="name" onChange={(event) => setName(event.target.value)} />
          <textarea type="text" required placeholder="description" onChange={(event) => setDescription(event.target.value)}  />
          <input type="number" step="0.01" required placeholder="price" onChange={(event) => setPrice(parseFloat(event.target.value))} />
          <input type="text" required placeholder="genre" onChange={(event) => setGenre(event.target.value)} />
          <input type="number" required placeholder="quantity" onChange={(event) => setQuantity(event.target.value)} />
          <input type="text" required placeholder="image_url" onChange={(event) => setImage(event.target.value)} />
          <span className="active-select">active</span>
            <select value={active.toString()} onChange={(event) => setActive(event.target.value)}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          <button type="submit" formtype="add-form" >Add To Library</button>
        </form>
      </div>
      <h2>Update</h2>
      <select className="productSelect" value={selectedProduct?.product_id} onChange={handleOptionChange}>
            <option value="">Select a product to update</option>
            {productOptions}
          </select>
          <input />
          <button onClick={() => handleReact(selectedProduct?.product_id)} >Update {selectedProduct?.name}</button>
      <h2>Deactivate / Reactivate</h2>
          <select className="productSelect" value={selectedProduct?.product_id} onChange={handleOptionChange}>
            <option value="">Select a product to deactivate / reactivate</option>
            {productOptions}
          </select>
          <button onClick={() => handleDeact(selectedProduct?.product_id)} >Deactivate Product</button>
          <button onClick={() => handleReact(selectedProduct?.product_id)} >Reactivate Product</button>
    </div>
  )
}

export default AdminPage


{/* <h2>Orders</h2>
<ul className="orders-table">
<div className="orders-table-header">
  <p><strong>Order ID</strong></p>
  <p><strong>Name</strong></p>
  <p><strong>User ID</strong></p>
  <p><strong>Product ID</strong></p>
  <p><strong>Quantity</strong></p>
  <p><strong>Order Date</strong></p>
</div>
{allOrders.map((order, index) => (
  <li key={order._id} className={`user-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
    <p>{order.order_id}</p>
    <p>{order.name}</p>
    <p>{order.user_id}</p>
    <p>{order.product_id}</p>
    <p>{order.quantity}</p>
    <p>{order.order_date}</p>
  </li>
))}
</ul> */}