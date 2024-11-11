// import React from "react";
// import { useHistory } from "react-router-dom";
// import { Link } from 'react-router-dom'


import React from 'react'
import {useDispatch , useSelector} from 'react-redux'
import StripeCheckout from 'react-stripe-checkout'
import { placeOrder } from '../actions/orderAction'
import Error from "../components/Error";
import Loading from "../components/Loading";
import Success from '../components/Success'



export default function Checkout({ subtotal }) {   //use previous data for checkout 

  // const history = useHistory();   //hook to get previous data from browser
  // const routeChange = () =>{ 
  //   history.push({pathname:'/payment',
  //   state:{subtotal:{subtotal}}
  // });
  // }

  const orderstate = useSelector((state) => state.placeOrderReducer)
    const {loading , error , success} = orderstate
    const dispatch = useDispatch()
    function tokenHander(token)
    {
        console.log(token);
        dispatch(placeOrder(token , subtotal))

    }




  return (
    // <div>
    //       <Link className="btn payment-btn bg-primary mt-5 text-light"
    //         to={{
    //           pathname: '/payment',
    //           state: { subtotal: {subtotal} }
    //         }}

    //         >Pay Now</Link>
    // </div>
    <div>
            
            {loading && (<Loading/>)}
            {error && (<Error error='Something went wrong'/>)}
            {success && (<Success success='Your Order Placed Successfully'/>)}

            <StripeCheckout
            amount={subtotal*100}
            shippingAddress
            token={tokenHander}
            stripeKey='pk_test_51Ks8XVIX6jiHQ1671tYMm0psQmefPAJKrJIHrRUJyLKmNPmNqfym39ts7zfNx1U1n6UhtYgys9HMX7WROKui30a500AfDBblw4'
            currency='USD'
            >

                  
                  <button className='btn bg-dark mt-3 text-light'>Pay Now</button>

            </StripeCheckout>
            
        </div>
  );
}
