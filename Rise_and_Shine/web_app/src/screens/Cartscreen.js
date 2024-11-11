import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../actions/cartActions";
import { deleteFromCart } from "../actions/cartActions";
import Checkout from "../components/Checkout";
//use cart reducer to display current cart state 
export default function Cartscreen() {
  const cartstate = useSelector((state) => state.cartReducer);
  const cartProducts = cartstate.cartProducts;
  var subtotal = cartProducts.reduce((x, item) => x + item.price, 0);

  const dispatch = useDispatch();
  return (
    <div>
      <div className="row justify-content-center">
        <div className="col-md-5">
         
          <h2>My Cart</h2>
          <hr/>
          {/* display all the products  */}
          {cartProducts.map((product) => {
            return (
              <div className="flex-container">
                <div className="text-left m-2 w-100">
                  <h1>{product.name}</h1>
                  <h1>
                    Price : {product.quantity}*{product.varient}={product.price}
                  </h1>
                  <h1 style={{ display: "inline" }}>Quantity : </h1>
                  <i
                    className="fa fa-plus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(
                          product,
                          product.quantity + 1,
                          product.varient
                        )
                      );
                    }}
                  ></i>
                  <b>{product.quantity}</b>
                  <i
                    className="fa  fa-minus"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(
                        addToCart(
                          product,
                          product.quantity - 1,
                          product.varient
                        )
                      );
                    }}
                  ></i>
                  <hr />
                </div>

                <div className="m-1 w-100">
                  <img
                    src={product.image}
                    style={{ height: "80px", width: "80px" }}
                  />
                </div>

                <div className="m-1 w-100">
                  <i
                    className="fa  fa-trash mt-4"
                    aria-hidden="true"
                    onClick={() => {
                      dispatch(deleteFromCart(product));
                    }}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>

        <div className="col-md-4 mt-5">

          <h2 style={{ fontSize: "40px" }}> Subtotal: {subtotal}$ /- </h2>
          <Checkout subtotal={subtotal} />
        </div>
      </div>
    </div>
  );
}
