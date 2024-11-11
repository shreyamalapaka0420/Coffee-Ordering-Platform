export const addToCart = (item, quantity, varient) => (dispatch, getState) => {
 //Create cart product 
 
  var cartProduct = {
    name: item.name,
    _id: item._id,
    image: item.image,
    varient: varient,                              //create cart product model
    quantity: Number(quantity),
    prices: item.prices,
    price: item.prices[0][varient] * quantity,
  };

  if(cartProduct.quantity>10)
  {
    alert('you cannot add more than 10 items')    
  }
  else{
    if(cartProduct.quantity<1){
       dispatch({type:'DELETE_FROM_CART', payload: item})
    }else{
  dispatch({ type: "ADD_TO_CART", payload: cartProduct });
    }
  }

  const cartProducts = getState().cartReducer.cartProducts;     //get current state of cart 
  localStorage.setItem("cartProducts", JSON.stringify(cartProducts));  //add it to local storage 
};

export const deleteFromCart= (item) => (dispatch, getState)=>{  //delete items from cart 

  dispatch({type: 'DELETE_FROM_CART', payload: item})        
  const cartProducts = getState().cartReducer.cartProducts
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts))
}