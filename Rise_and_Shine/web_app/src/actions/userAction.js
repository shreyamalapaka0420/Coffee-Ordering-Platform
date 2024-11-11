import axios from "axios";

export const registerUser = (user) => async (dispatch) => {    //request user to register 
  dispatch({ type: "USER_REGISTER_REQUEST" });

  try {
    const response = await axios.post("/api/users/register", user);
    console.log(response);
    dispatch({ type: "USER_REGISTER_SUCCESS" });
  } catch (error) {
    dispatch({ type: "USER_REGISTER_FAILED", payload: error });
  }
};

export const loginUser = (user) => async (dispatch) => {    //to verify user and login 
  dispatch({ type: "USER_LOGIN_REQUEST" });

  try {
    const response = await axios.post("/api/users/login", user);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: response.data });
    localStorage.setItem("currentUser", JSON.stringify(response.data));
    window.location.href = "/";
  } catch (error) {
    dispatch({ type: "USER_LOGIN_FAILED", payload: error });
  }
};

export const logoutUser = (user) => async (dispatch) => {  //when clicked on logout send user to login page 
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
  localStorage.removeItem('cartProducts');
};

export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_USERS_REQUEST" });
  try {
    const response = await axios.get("/api/users/getallusers");// call backend api to get all items and fetch response 
    console.log(response);
    dispatch({ type: "GET_USERS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_USERS_FAILED", payload: error });
  }
};

export const deleteUser = (userid) => async dispatch =>{

  try{
      await axios.post('/api/users/deleteuser', {userid})
      alert('User deleted successfully')
      window.location.reload()
  }catch(error){
      alert('something went wrong')
      console.log(error)
  }
}