import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../actions/userAction";
import Cart from "./Cart";

export default function Navbar() {
  const cartstate = useSelector((state) => state.cartReducer);
  const userState = useSelector((state) => state.loginUserReducer);
  const { currentUser } = userState;
  const dispatch = useDispatch();
  //display responsive nav bar
  return (
    <div className="dummyDiv">
      <nav className="navbar navbar-expand-lg p-3 mb-4 navbar-light bg-dark ">
        <a className="navbar-brand text-light" href="/">
          Rise <mark>&</mark> Shine
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarNav">
          <ul className="navbar-nav ms-auto">
            {currentUser ? (
              <div className="list-inline-item-div">
                <li className="list-inline-item nav-name text-light ">
                  Welcome {currentUser.name}!
                </li>
                {userState.currentUser.isAdmin && <a
                  className="list-inline-item text-light"
                  href="/admin"
                >
                  Admin
                </a>}
                
                <a
                  className="list-inline-item text-light"
                  href="/orders"
                >
                  Orders
                </a>
                <a
                  className="list-inline-item text-light"
                  href="/login"
                  onClick={() => {
                    dispatch(logoutUser());
                  }}
                >
                  Logout
                </a>
              </div>
            ) : (
              <li className="nav-item text-light ">
                <a className="nav-link text-light " href="/login">
                  Sign In
                </a>
              </li>
            )}

            {/* display no of products in cart  */}

            {localStorage.getItem("currentUser") ? <Cart /> : <div></div>}
          </ul>
        </div>
      </nav>
    </div>
  );

}
