import '../css/AdminPage.css'
import { useCallback, useEffect, useState, Fragment } from 'react'
import { addProduct, deactivateProduct, getAllOrders, getAllProducts, getAllUsers, reactivateProduct, updateProduct } from '../api/AdminPage'
import useNotification from './ui/useNotification';
//child of App.js

const AdminPage = ({ token, username }) => {
  const { toastNotify } = useNotification();

  //**************Toggle view buttons - done
  const [usersView, setUsersView] = useState(false);
  const [ordersView, setOrdersView] = useState(false);
  const [addView, setAddView] = useState(false);
  const [updateView, setUpdateView] = useState(false);
  const [drView, setDRView] = useState(false);

//**************View all users - done
  const [allUsers, setAllUsers] = useState([]);

  //*fetch all users
  const fetchAllUsers = useCallback(async () => {
    const result = await getAllUsers();
    setAllUsers(result);
  }, []);

  useEffect(() => {
    fetchAllUsers();
  }, [fetchAllUsers])

//**************View all orders - done
  const [allOrders, setAllOrders] = useState([]);

  //fetch all orders
  const fetchAllOrders = useCallback(async () => {
    const result = await getAllOrders();
    setAllOrders(result);
  }, []);

  useEffect(() => {
    fetchAllOrders();
  }, [fetchAllOrders]);
  
  const ordersByDate = allOrders.reduce((accumulator, order) => {
    const date = order.order_date;
    if (accumulator[date]) {
      accumulator[date].push(order);
    } else {
      accumulator[date] = [order];
    }
    return accumulator;
  }, {});

//**************Add product - done
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
    const message = result.error ? `${result.message}` : `Product added to library`
    setName("");
    setDescription("");
    setPrice("");
    setGenre("");
    setQuantity("");
    setImage("");
    console.log(message);
    toastNotify(message, result.error ? "error" : "success");

    //refresh product list after update
    const updatedProductsData = await getAllProducts();
    setAllProducts(updatedProductsData);
  }

  //-------------------------------------------------------------------------------------
  //helper for bottom 3 functions
  const [allProducts, setAllProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState([]);
  
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
    <option key={product.product_id} value={product.product_id} data-active={product.active}>{product.product_id} - {product.name} - {product.active ? "active" : "inactive"}</option>
    )) : null;

//**************Update product - done
 const handleUpdate = async (event) => {
  event.preventDefault();

  if (!selectedProduct) {
    toastNotify("Please select a product to update", "info");
    return;
  }
  if (name === "" &&
  description === "" &&
  price === "" &&
  genre === "" &&
  quantity === "" &&
  image === "" &&
  active === selectedProduct.active) {
    console.log("Field(s) must be updated to process change");
    toastNotify("Field(s) must be updated to process change", "error");
    return null;
  }

  const result = await updateProduct({ 
    productId: selectedProduct.product_id, //pass the selectedProduct.product_id as the productId parameter 
    name, description, price, genre, quantity, image, active
  });
  const message = result.error ? `${result.message}` : 'Product updated';
  setName("");
  setDescription("");
  setPrice("");
  setGenre("");
  setQuantity("");
  setImage("");
  console.log(result);
  toastNotify(message, result.error ? "error" : "success");

  //refresh product list after update
  const updatedProductsData = await getAllProducts();
  setAllProducts(updatedProductsData);
 }

//**************Deactivate product - done
const handleDeact = async (productId) => {
  if(!selectedProduct.active) {
    toastNotify("product already inactive", "info");
    return;
  } else if (!productId || productId === "") {
    toastNotify("Please select a product", "error");
    return;
  }
  try {
    await deactivateProduct({ token, productId });
    toastNotify(`Product ID: ${selectedProduct.product_id} - ${selectedProduct.name} deactivated`, "success");
    setSelectedProduct("");

    //refresh product list after deactivation
    const updatedProductsData = await getAllProducts();
    setAllProducts(updatedProductsData);
  } catch (error) {
    console.error(error);
  }
};

//**************Reactivate product - done
const handleReact = async (productId) => {
  if(selectedProduct.active) {
    toastNotify("product already active", "info");
    return;
  } else if (!productId || productId === "") {
    toastNotify("Please select a product", "error");
    return;
  }
  try{
    await reactivateProduct({ token, productId });
    toastNotify(`Product ID: ${selectedProduct.product_id} - ${selectedProduct.name} reactivated`, "success");
    setSelectedProduct("");

    //refresh product list after reactivation
    const updatedProductsData= await getAllProducts();
    setAllProducts(updatedProductsData);
  } catch (error) {
    console.error(error);
  }
};

  return (
    <div className='admin-body'>
      <div className="toggle-buttons">

        <button name="toggle" onClick={() => setUsersView(prev => !prev)}>Users</button>
        <button name="toggle" onClick={() => setOrdersView(prev => !prev)}>Orders</button>
        <button name="toggle" onClick={() => setAddView(prev => !prev)}>Add Product</button>
        <button name="toggle" onClick={() => setUpdateView(prev => !prev)}>Update Product</button>
        <button name="toggle" onClick={() => setDRView(prev => !prev)}>Product Status (active/inactive)</button>
      </div>
      {!usersView && !ordersView && !addView && !updateView && !drView ? 
        <>
          <h1 className='welcome-admin'>Welcome Admin {username}</h1>
          <div className="admin-img">
          <img className="admin-img" src="https://media.istockphoto.com/id/1154370446/photo/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=kkZiaB9Q-GbY5gjf6WWURzEpLzNrpjZp_tn09GB21bI=" alt="Donkey" />
          </div>
        </>:
      <div>
      {usersView ?
      <div className="users-box">
        <h2 className='admin-h2'>Users</h2>
        <table className="users-table">
          <thead>
            <tr className="users-table-header">
              <th><strong>User ID</strong></th>
              <th><strong>Name</strong></th>
              <th><strong>Email</strong></th>
              <th><strong>Username</strong></th>
              <th><strong>Password</strong></th>
              <th><strong>Admin</strong></th>
            </tr>
          </thead>
          {allUsers.map((user) => (
            <tbody key={user.user_id}>
              <tr className={user.admin === true ? "admin-row users-table-row" : "users-table-row"}>
                <td>{user.user_id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.username}</td>
                <td>{user.password}</td>
                <td>{user.admin ? "Yes" : "No"}</td>
              </tr>
            </tbody>
            ))}
        </table>
      </div>
      : "" }
      <br />
      {ordersView ?
      <div className="orders-box">
        <h2 className='admin-h2'>Orders</h2>
        <table className="orders-table">
          <thead>
            <tr className="orders-table-header">
              <th><strong>Order Date</strong></th>
              <th><strong>Order ID</strong></th>
              <th><strong>Name</strong></th>
              <th><strong>User ID</strong></th>
              <th><strong>Product ID</strong></th>
              {/* <th><strong>Quantity</strong></th> */}
              {/* <p><strong>Order Date</strong></p> */}
            </tr>
          </thead>
          {Object.keys(ordersByDate).map((date, index) => (
          <Fragment key={date}>
            <tbody className="date-row">
              {/* <p><strong>Order Date: </strong>{date}</p> */}
            </tbody>
          {ordersByDate[date].map((order, orderIndex) => (
            <tbody key={order.order_id}>
              <tr className={`orders-table-row ${index % 2 === 0 ? 'even' : 'odd'}`}>
                <td className={`date ${orderIndex === 0 ? 'bold-date' : 'rest-date'}`}>{date}</td>
                <td>{order.order_id}</td>
                <td>{order.name}</td>
                <td>{order.user_id}</td>
                <td>{order.product_id}</td>
                {/* <td>{order.quantity}</td> */}
              </tr>
            </tbody>
          ))}
          </Fragment>
          ))}
        </table>
      </div>
      : "" }
      <br />
      {addView ? 
      <div className="add-box">
      <h2 className='admin-h2'>Add Product</h2>
        <form onSubmit={handleAdd} id="add-form">
          <input type="text" required placeholder="Name" onChange={(event) => setName(event.target.value)} />
          <textarea type="text" required placeholder="Description" onChange={(event) => setDescription(event.target.value)}  />
          <input type="number" step="0.01" required placeholder="Price" onChange={(event) => setPrice(parseFloat(event.target.value))} />
          <input type="text" required placeholder="Genre" onChange={(event) => setGenre(event.target.value)} />
          <input type="number" required placeholder="Quantity" onChange={(event) => setQuantity(event.target.value)} />
          <input type="text" required placeholder="Image_URL" onChange={(event) => setImage(event.target.value)} />
          <span className="active-label">active
            <select className="active-select" value={active ?? false} onChange={(event) => setActive(event.target.value)}>
              <option value={true}>Yes</option>
              <option value={false}>No</option>
            </select>
          </span>
          <button name="button" formtype="add-form" >Add To Library</button>
        </form>
      </div>
      : "" }
      <br />
      {updateView ?
      <div className="update-box">
        <h2 className='admin-h2'>Update Product</h2>
          <br/>
          <select className="productSelect" value={selectedProduct?.product_id || ""} onChange={handleOptionChange}>
              <option value="">Select a product to update</option>
              {productOptions}
          </select>
          <br/>
          <br/>
          <form onSubmit={handleUpdate} id="update-form">
            <input type="text" placeholder={selectedProduct?.name || "Name"} onChange={(event) => setName(event.target.value)}/>
            <textarea type="text" placeholder={selectedProduct?.description || "Description"} onChange={(event) => setDescription(event.target.value)} />
            <input type="number" step="0.01" placeholder={selectedProduct?.price || "Price"} onChange={(event) => setPrice(event.target.value)} />
            <input type="text" placeholder={selectedProduct?.genre || "Genre"} onChange={(event) => setGenre(event.target.value)} />
            <input type="number" placeholder={selectedProduct?.quantity || "Quantity"} onChange={(event) => setQuantity(event.target.value)} />
            <input type="text" placeholder={selectedProduct?.image_url || "Image_URL"} onChange={(event) => setImage(event.target.value)} />
          {/* <br/>
          <br/>
            <span>active </span>
          <span>{selectedProduct?.active ? <span className="product-active-indicator">&nbsp;active</span> 
            : <span className="product-active-indicator">&nbsp;inactive</span>}</span> */}
              {/* <select value={selectedProduct?.active ?? false} onChange={(event) => setActive(event.target.value)}>
                <option value={true}>Yes</option>
                <option value={false}>No</option>
              </select> */}
            <button name="button" value={selectedProduct?.product_id} formtype="update-form" >Update {selectedProduct?.name}</button>
        </form>
      </div>
      : "" }
      <br />
      {drView ?
      <div className="dr-box">
        <h2 className='admin-h2'>Product Status (active/inactive)</h2>
            <div className="dr-buttons">
              <button name="button" onClick={() => handleDeact(selectedProduct?.product_id)} >Deactivate</button>
              <button name="button" onClick={() => handleReact(selectedProduct?.product_id)} >Reactivate</button>
            </div>
            <select className="productSelect" value={selectedProduct?.product_id || ""} onChange={handleOptionChange}>
              <option value="">Select a product to deactivate / reactivate</option>
                {productOptions}
            </select>
      </div>
      : "" }
      </div>
    }
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

// const productOptions = allProducts ? allProducts.sort((a, b) => a.product_id - b.product_id).map(product => (
//   <option key={product._id} value={product.product_id}>{product.product_id} - {product.name} - 
//   {product.active ? <span className="product-active-indicator">&nbsp;active</span> 
//   : <span className="product-active-indicator">&nbsp;inactive</span>}</option>
// )) : null;