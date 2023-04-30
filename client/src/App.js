import './App.css';
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
  SingleProductView
} from './components'

function App() {
  return (
    <div className="App">
      <h1 className='navbar'>NAVBAR</h1>
      <Cart/>
    </div>
  );
}

export default App;
