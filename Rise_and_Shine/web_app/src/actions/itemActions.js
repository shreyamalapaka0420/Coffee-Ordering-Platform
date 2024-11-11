import axios from "axios";
export const getAllitems = () => async (dispatch) => {
  dispatch({ type: "GET_ITEMS_REQUEST" });
  try {
    const response = await axios.get("/api/items/getAllitems");// call backend api to get all items and fetch response 
    dispatch({ type: "GET_ITEMS_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ITEMS_FAILED", payload: error });
  }
};

export const filterItems = (searchkey, category) => async (dispatch) => {
  var filteredItems;
  dispatch({ type: "GET_ITEMS_REQUEST" });
  try {
    const response = await axios.get("/api/items/getAllitems");// call backend api to get all items and fetch response 
    filteredItems = response.data.filter(item => item.name.toLowerCase().includes(searchkey.toLowerCase()))
    if(category != 'all')
    {
      filteredItems = response.data.filter(item => item.category.toLowerCase() == category.toLowerCase())
    }
    
    dispatch({ type: "GET_ITEMS_SUCCESS", payload: filteredItems});
  } catch (error) {
    dispatch({ type: "GET_ITEMS_FAILED", payload: error });
  }
};

export const addItem=(item) =>async dispatch=>{       //add new items
  dispatch({type:'ADD_ITEM_REQUEST'})
  try {
    const response = await axios.post('/api/items/additem',{item})  //get new items from callback api and fetch response
    dispatch({type:'ADD_ITEM_SUCCESS'})
  } catch (error) {
    dispatch({type:'ADD_ITEM_FAILED',payload:error})
  }
}

export const getItemById = (itemId) => async (dispatch) => {
  dispatch({ type: "GET_ITEM_BY_ID_REQUEST" });
  try {
    const response = await axios.post("/api/items/getItemById",{itemId});
    dispatch({ type: "GET_ITEM_BY_ID_SUCCESS", payload: response.data });
  } catch (error) {
    dispatch({ type: "GET_ITEM_BY_ID_FAILED", payload: error });
  }
};

export const editItem=(updatedItem) =>async dispatch=>{
  dispatch({type:'EDIT_ITEM_REQUEST'})
  try {
    const response = await axios.post('/api/items/edititem',{updatedItem})
    dispatch({type:'EDIT_ITEM_SUCCESS'})
  } catch (error) {
    dispatch({type:'EDIT_ITEM_FAILED',payload:error})
  }
}

export const deleteItem = (itemId) =>async  dispatch => {

try{
 const response =  await axios.post('/api/items/deleteitem', {itemId} )
 alert('Item Deleted Successfully')
 window.location.reload()
}catch(error){
  alert('something wwent wrong')
  console.log(error)
}

}
