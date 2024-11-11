import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllitemsReducer,addItemReducer, getItemByIdReducer, editItemReducer } from "./reducers/itemReducers";
import { cartReducer } from "./reducers/cartReducer";
import { loginUserReducer, registerUserReducer, getAllUsersReducer } from "./reducers/userReducer";
import { placeOrderReducer,getUserOrdersReducer, getAllOrdersReducer, getAllDriversReducer} from "./reducers/orderReducer";

//register all the used reducers 
const finalReducer = combineReducers({
  getAllitemsReducer: getAllitemsReducer,
  cartReducer: cartReducer,
  registerUserReducer : registerUserReducer,
  loginUserReducer: loginUserReducer,
  placeOrderReducer: placeOrderReducer,
  getUserOrdersReducer : getUserOrdersReducer,
  addItemReducer : addItemReducer,
  getItemByIdReducer : getItemByIdReducer,
  editItemReducer : editItemReducer,
  getAllOrdersReducer: getAllOrdersReducer,
  getAllUsersReducer: getAllUsersReducer,
  getAllDriversReducer : getAllDriversReducer
});
const cartProducts = localStorage.getItem("cartProducts")  //if local storage has already stored products display them or send empty array
  ? JSON.parse(localStorage.getItem("cartProducts"))
  : [];

const currentUser = localStorage.getItem("currentUser")   //if local storage has current suer display user or send null 
? JSON.parse(localStorage.getItem("currentUser")) : null


const initialState = {
  cartReducer: {
    cartProducts: cartProducts,
  },
  loginUserReducer : {
    currentUser : currentUser,
  }
};
const composeEnhancers = composeWithDevTools({});
const store = createStore(
  finalReducer,
  initialState,

  composeEnhancers(applyMiddleware(thunk))
);

export default store;
