import '../css/AdminPage.css'
import { useCallback, useEffect, useState, Fragment } from 'react'
import { addProduct, getAllOrders, getAllProducts, getAllUsers } from '../api/AdminPage'

//child of App.js

const AdminPage = () => {

//view all users - done
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
  
//view all orders - done
  const [allOrders, setAllOrders] = useState([]);

  //*fetch all orders
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

//add product - done
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

    console.log(message);
  }
  
  // console.log("active value", active);

  //------------------------------------------------------------------------------------
  //helper for bottom 3 functions
  const [allProducts, setAllProducts] = useState([]);
  const [selectProduct, setSelectProduct] = useState(null);
  
  const fetchAllProducts = useCallback(async () => {
    const result = await getAllProducts();
    setAllProducts(result);
  }, []);

  useEffect(() => {
    fetchAllProducts();
  }, [fetchAllProducts])

  const handleProductChange = (event) => {
    const productId = parseInt(event.target.value);
    const selectedProduct = allProducts.find(product => product.product_id === productId);
    setSelectProduct(selectedProduct);
    console.log("selected product:", selectProduct);
  };

  const productOptions = allProducts.sort((a, b) => a.product_id - b.product_id).map(product => (
    <option key={product._id} value={product._id}>{product.product_id} - {product.name} - <span>{product.active ? <span className="product-active-indicator">&nbsp;active</span> : <span className="product-active-indicator">&nbsp;inactive</span>}</span></option>
  ));


  // console.log("allProducts:", allProducts);

//update product

//deactivate product

  const handleDeactivate = (event) => {
    // setActiveOnly(event.target.checked);
  };

//reactivate product



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
      <h2>Update----------------</h2>
      <h2>Deactivate</h2>

      <select id="productInput" value={selectProduct || ""} onChange={(event) => handleProductChange(event.target.value)}>
        <option value="">Select a product to deactivate</option>
        {productOptions}
      </select>
      {selectProduct && (
        <div>
          <p>Product Name: {selectProduct.name}</p>
          <span>Active: {selectProduct.active ? <span>&nbsp;Yes</span> : <span>&nbsp;No</span>}</span>
        </div>
      )}
        {/* <span>Active: {product.active === true ? <span>&nbsp;Yes</span> : <span>&nbsp;No</span>}</span> */}
        <button>Deactivate Product</button>

          {/* <span>Active: {product.active === true ? <span>&nbsp;Yes</span> : <span>&nbsp;No</span>}</span> */}
      <h2>Reactivate-------------</h2>
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