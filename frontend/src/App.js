import React from 'react';
import './App.css';
import {BrowserRouter,Route, Link} from 'react-router-dom'
import HomeScreen from './screens/HomeScreen'
import ProductScreen from './screens/ProductScreen'
import CartScreen from './screens/CartScreen';
import SigninScreen from './screens/SigninScreen';
import { useSelector } from 'react-redux';
import RegisterScreen from './screens/RegisterScreen';
import ProductsScreen from './screens/ProductsScreen';


function App() {
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
  

  const openMenu = () => {
    document.querySelector(".sidebar").classList.add("open");
  }
  const closeMenu = () => {
    document.querySelector(".sidebar").classList.remove("open")
  }
    return (
        <BrowserRouter>
<div className="grid-container" >
        <header className="header">
           <div className="brand">
               <button onClick={openMenu}>
                   &#9776;
               </button>
               <Link to="/">Camerawale</Link>
           </div>
           <div className="header-links">
               <a href="cart.html">Cart</a>&nbsp;&nbsp;
               {
              userInfo ? <Link to="/profile">{userInfo.name}</Link> :
                <Link to="/signin">Sign In</Link>
            }
           </div>
           
        </header>
        <aside className="sidebar">
            <h3>Categories</h3>
            <button className="sidebar-close-button" onClick={closeMenu}>X</button>
            <ul className="categories">
            <li>
              <Link to="/category/Dslr">Dslr</Link>
            </li>

            <li>
              <Link to="/category/Action-Camera">Action-Camera</Link>
            </li>

          </ul>
        </aside>
        <main className="main">
            <div className="content">
                <Route path="/signin" component={SigninScreen} />
                <Route path="/products" component={ProductsScreen} />
                <Route path="/register" component={RegisterScreen} />
                <Route path="/product/:id" component={ProductScreen} />
                <Route path="/cart/:id?" component={CartScreen}  />
             <Route path="/" exact={true} component={HomeScreen} />
             <Route path="/category/:id" component={HomeScreen} />
               
            </div>
          
        </main>
       
    </div>
    </BrowserRouter>
  );
}


export default App;
