import "./App.css";
import { Routes, Route } from 'react-router-dom';
import {
  AdminPage,
  Cart,
  Home,
  Login,
  Navbar,
  OrderPage,
  Profile,
  Register,
  Reviews,
  Search,
  SingleProductView,
} from "./components";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/cart" element={<Cart />}/>
        <Route path="/register" element={<Register />}/>
      </Routes>
    </div>
  );
}

export default App;
