import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllDrivers, placeOrder, sendEmail } from "../actions/orderAction";
import { useLocation } from "react-router-dom";
import axios from "axios";

// get user location and total amount and handle change in address form
const Payment = () => {
  const orpderPlacedDOM = document.getElementsByClassName("order_placed")[0];
  const driverDetailsDOM = document.getElementsByClassName("driver-details")[0];

  const getdriversstate = useSelector((state) => state.getAllDriversReducer);
  const { loading, error, drivers } = getdriversstate;

  const dispatch = useDispatch();
  const location = useLocation();
  const { subtotal } = location.state;
  const [address, setAddress] = useState(null);
  var driverName = "";

  useEffect(() => {
    dispatch(getAllDrivers());
  }, []);

  const handleChange = (e) => {
    let updatedValue = {};
    updatedValue = { [e.target.name]: e.target.value };
    setAddress((address) => ({
      ...address,
      ...updatedValue,
    }));
  };
  //prevent the page from reloading after click and dispatch the place order method
  const handleSubmit = (e) => {
    e.preventDefault();
    orpderPlacedDOM.textContent = "Order placed successfully!";
    getRanndDriver();
    dispatch(placeOrder(address, subtotal));
    dispatch(sendEmail(driverName));
    localStorage.removeItem("cartProducts");
  };
  const getRanndDriver = () => {
    if (drivers) {
      driverName = drivers[Math.floor(Math.random() * drivers.length)].name;
      driverDetailsDOM.textContent = driverName + " will deliver your order";
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Address</h3>
      <label>
        Door No:
        <input type="text" name="DoorNo" onChange={handleChange} required />
      </label>
      <label>
        Street Name:
        <input type="text" name="StreetName" onChange={handleChange} required />
      </label>
      <label>
        City:
        <input type="text" name="City" onChange={handleChange} required />
      </label>
      <label>
        Zipcode:
        <input type="text" name="Zipcode" onChange={handleChange} required />
      </label>
      <h3>Card details:</h3>
      <label className="payment">
        Number of your Card:
        <input type="text" minLength={16} maxLength={16} required />
      </label>
      <br></br>
      <label className="payment-1">
        Expiry date:
        <input type="text" />
      </label>
      <br></br>
      <label className="payment-2">
        CVV:
        <input type="text" minLength={3} maxLength={3} required/>
      </label>
      <br></br>
      <input type="submit" value="Place Order" className="place_order" />

      <p className="order_placed text-success"></p>
      <p className="driver-details text-success"></p>
    </form>
  );
};

export default Payment;
