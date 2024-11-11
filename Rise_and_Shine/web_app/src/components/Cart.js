import React from "react";
import { useSelector, useDispatch } from "react-redux";


const Cart = () => {
    const cartstate = useSelector((state) => state.cartReducer);

    return ( <div>
        <li className="nav-item text-light">
              <a className="nav-link text-light" href="/cart">
                Cart {cartstate.cartProducts.length}    
              </a>
            </li>
    </div> );
}
 
export default Cart;