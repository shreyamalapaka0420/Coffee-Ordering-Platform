import React, { useState } from "react";
import { Modal } from "react-bootstrap";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../actions/cartActions";


export default function Item({ item }) {
  const [quantity, setquantity] = useState(1);
  const [varient, setvarient] = useState("small");
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  function addtocart() {
    
    if(currentUser == undefined){
      console.log("please Login");
      alert("Please login to place order");
    }
    dispatch(addToCart(item, quantity, varient));
  }
  //cards to display products in grid format
  return (
    <div className="  p-4 mb-7 bg-transparent">
      <div onClick={handleShow}>
        <h1 className="itemname">{item.name}</h1>
        <img src={item.image} className="img-fluid" />
      </div>

      <div className="flex-container">
        <div className="w-100">
          <p>Sizes</p>
          <select
            className="sizes-dropdown"
            value={varient}
            onChange={(e) => {
              setvarient(e.target.value);
            }}
          >
            {item.varients.map((varient) => {
              return <option value={varient}>{varient}</option>;
            })}
          </select>
        </div>

        <div className="w-100">
          <p>Quantity</p>
          <select
            value={quantity}
            onChange={(e) => {
              setquantity(e.target.value);
            }}
          >
            {[...Array(10).keys()].map((x, i) => {
              //spread operator
              return <option value={i + 1}>{i + 1}</option>;
            })}
          </select>
        </div>
      </div>

      <div className="flex-container">
        <div className="m-3 w-100">
          <h1 className="price-text">
            {" "}
            Price: {item.prices[0][varient] * quantity}$
          </h1>
          <button className="btn bg-secondary text-light" onClick={addtocart}>
            Add To Cart
          </button>
      </div>
      </div>
      {/* popups */}
      <div class="modal" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Modal title</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <p>Modal body text goes here.</p>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
              <button
                type="button"
                class="btn btn-primary"
                data-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <Modal show={show}>
        <Modal.Header>
          <Modal.Title>{item.name}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <img src={item.image} className="img-fluid"></img>
          <p>{item.description}</p>
        </Modal.Body>

        <Modal.Footer>
          <button className="btn bg-primary text-light" onClick={handleClose}>
            CLOSE
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
