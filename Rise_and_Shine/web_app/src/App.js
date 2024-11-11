import logo from "./logo.svg";
import "./App.scss";
// import "../node_modules/rsuite/dist/rsuite.css";
// import "/node_modules/bootstrap/dist/js/bootstrap.bundle.min";

import Navbar from "./components/Navbar";
import Homescreen from "./screens/Homescreen";
import Registerscreen from "./screens/Registerscreen";
import Loginscreen from "./screens/Loginscreen";
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import Cartscreen from "./screens/Cartscreen";
import Payment from "./screens/Payment";
import Ordersscreen from "./screens/Ordersscreen";
import Adminscreen from "./screens/Adminscreen";

//map all the pages to particualar routes
function App() {
  return (
    <div className="App">
      <Navbar />
      <BrowserRouter>
        <Route path="/login" exact component={Loginscreen} />
        <Route path="/" exact component={Homescreen} />
        <Route path="/cart" exact component={Cartscreen} />
        <Route path="/payment" exact component={Payment} />
        <Route path="/register" exact component={Registerscreen} />

        <Route path="/orders" exact component={Ordersscreen} />
        <Route path="/admin" component={Adminscreen} />
      </BrowserRouter>
    </div>
  );
}

export default App;
