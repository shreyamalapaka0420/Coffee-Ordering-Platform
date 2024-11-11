import axios from "axios";

export const placeOrder = (token,subtotal) => async (dispatch,getState) => {    //check if user is logged in and place order 
  dispatch({ type: "PLACE_ORDER_REQUEST" });   
  const currentUser = getState().loginUserReducer.currentUser
  const cartItems = getState().cartReducer.cartProducts
  try {
    const response = await axios.post("/api/orders/placeorder",{token,subtotal,currentUser,cartItems});
    dispatch({ type: "PLACE_ORDER_SUCCESS"});
    console.log(response);
  } catch (error) {
    dispatch({ type: "PLACE_ORDER_FAILED"});
    console.log(error);
  }
};

export const getUserOrders = () => async (dispatch,getState) => {    //if order placed dispaly success
    const currentUser = getState().loginUserReducer.currentUser
    console.log(currentUser._id)
    dispatch({ type: "GET_USER_ORDERS_REQUEST" });
    try {
      const response = await axios.post("/api/orders/getuserOrders",{userid : currentUser._id});// fetching response by calling backend api 
      dispatch({ type: "GET_USER_ORDERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_USER_ORDERS_FAILURE", payload: error });
    }
  };

  export const getAllOrders = () => async (dispatch,getState) => {    //if order placed dispaly success
    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: "GET_ALLORDERS_REQUEST" });
    try {
      const response = await axios.get("/api/orders/getallOrders");// fetching response by calling backend api 
      dispatch({ type: "GET_ALLORDERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_ALLORDERS_FAILURE", payload: error });
    }
  };


  export const deliverOrder = (orderid) => async dispatch =>{

    try{
      const response = await axios.post('/api/orders/deliverorder', {orderid})
      alert('order acceped and will be delivered')
      const orders = await axios.get('/api/orders/getallorders')
      dispatch({type: 'GET_ALLORDERS_SUCCESS', payload: orders.data})
    }catch(error){
        console.log(error);
    }
  }

  export const getAllDrivers = () => async (dispatch) => {   
    dispatch({ type: "GET_ALLDRIVERS_REQUEST" });
    try {
      const response = await axios.get("/api/drivers/getallDrivers");// fetching response by calling backend api 
      dispatch({ type: "GET_ALLDRIVERS_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "GET_ALLDRIVERS_FAILURE", payload: error });
    }
  };

  export const sendEmail = (driver) => async (dispatch,getState) => {    //if order placed dispaly success
    const currentUser = getState().loginUserReducer.currentUser
    dispatch({ type: "SEND_EMAIL_REQUEST" });
    try {
      const response = await axios.post("/api/orders/sendemail",{useremail : currentUser.email,driver : driver});// fetching response by calling backend api 
      dispatch({ type: "SEND_EMAIL_SUCCESS", payload: response.data });
    } catch (error) {
      dispatch({ type: "SEND_EMAIL_FAILURE", payload: error });
    }
  };