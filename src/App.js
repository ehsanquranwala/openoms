import React, { Fragment ,Component} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import AppHeader from './layout/Header';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import Category from './components/Category';
import Gallery from './components/Gallery';
import Product from './components/Product';
import Cart from './components/Cart';
import Orders from './components/Orders';
import Profile from './components/Profile';
import PriceList from './components/PriceList';
import Invoice from './components/Invoice';


class App extends Component {
  render() {
      return (
    <Router>
      <Fragment>
            <AppHeader/>
        <Switch>
          <Route path="/register" component={Register}>
            
          </Route>
          <Route path="/gallery" component={Gallery}>
            
          </Route>
          <Route path="/category" component={Category}>
            
          </Route>
          <Route path="/product" component={Product}>
            
          </Route>
          <Route path="/price-list" component={PriceList}>
            
            </Route>
          <Route path="/login" component={Login}>
            <Login />
          </Route>
          <Route path="/cart" component={Cart}>
            
          </Route>
          <Route path="/orders" component={Orders}>
            
          </Route>
          <Route path="/profile" Component={Profile}>
         
          </Route>
        
          <Route path="/invoice" component={Invoice}>
            
            </Route>
          <Route path="/" component={Home}>
            
          </Route>
        </Switch>
      </Fragment>
    </Router>
  );
}
}
export default App;