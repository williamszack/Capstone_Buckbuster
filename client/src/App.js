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
      <h1 className='navbar'>Welcome to Buckbuster</h1>
      <Home />
    </div>
  );
}

export default App;
