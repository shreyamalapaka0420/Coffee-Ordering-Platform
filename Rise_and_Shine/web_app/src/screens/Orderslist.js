import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { deliverOrder, getAllOrders } from "../actions/orderAction";



const Orderslist = () => {

    const dispatch = useDispatch()
    const getordersstate = useSelector(state => state.getAllOrdersReducer)
    const{loading, error, orders} = getordersstate
    useEffect(() =>{
        dispatch(getAllOrders())
    }, [])
    return (
         <div className="table-responsive">
             {loading && (<Loading/>)}
                {error &&(<Error error = 'something went wrong'/>)}
                <table className="table table-striped table-borderd">
                    <thead >
                        <tr>
                            <th> Order ID</th>
                            <th> Email</th>
                            <th>User Id</th>
                            <th>Amount</th>
                            <th>Date</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders && orders.map(order => {
                            return <tr>
                                <td>{order._id}</td>
                                <td>{order.email}</td>
                                <td>{order.userid}</td>
                                <td>{order.orderAmount}</td>
                                <td>{order.createdAt.substring(0,10)}</td>
                                <td>
                                                {order.isDelivered ? (
                                    <h1>Accepted</h1>
                                    ) : (
                                    <button className="btn bg-dark" onClick={()=>{dispatch(deliverOrder(order._id))}}>Accept</button>
                                    )}
                                </td>
                            </tr>
                        })}
                    </tbody>
                </table>
        </div> 
        );
}
 
export default Orderslist;