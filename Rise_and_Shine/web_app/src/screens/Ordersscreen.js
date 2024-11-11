import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserOrders } from '../actions/orderAction'
import Loading from "../components/Loading";
import Error from "../components/Error";

export default function Ordersscreen() {
    const dispatch = useDispatch();
    //use user order reducer to get current state of orders and display
    const orderState = useSelector(state => state.getUserOrdersReducer)
    const { orders, error, loading } = orderState;

    useEffect(() => {
        dispatch(getUserOrders());
    }, [])
    //display list of products 
    return (
        <div>
            <h2>My Orders</h2>
            <div className="row justify-content-center">
                {orders && orders.map(order => {
                    return (
                        <div className="col-md-8 m-2 order_item" key={order._id}>
                            <div className="flex-container">
                                <div className="text-left w-100 m-1">
                                    <h5>Items</h5>

                                    {order.orderItems.map(item => {
                                        return (<p key={item._id}>{item.name} {item.quantity}*{item.varient}={item.price}</p>)
                                    })}
                                </div>

                                <div  className="text-left w-100 m-1">
                                    <h5>Shipping Address</h5>
                                    <p>Street : {order.shippingAddress.street}</p>
                                <p>City : {order.shippingAddress.city}</p>
                                <p>Country : {order.shippingAddress.country}</p>
                                <p>Pincode : {order.shippingAddress.pincode}</p>
                                    
                                </div>

                                <div className="text-left w-100 m-1">
                                <h5>Order Info</h5>
                                        <p>Order Amount: {order.orderAmount}</p>
                                        <p>Date: {order.createdAt.substring(0,10)}</p>
                                        <p>Transaction Id: {order.transactionId}</p>
                                        <p>Order Id: {order._id}</p>
                                    
                                </div>

                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    )
}