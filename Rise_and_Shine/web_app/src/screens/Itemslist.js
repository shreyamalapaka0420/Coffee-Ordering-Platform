import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteItem,getAllitems } from "../actions/itemActions";
import Item from "../components/Item";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { Link } from "react-router-dom";

const Itemslist = () => {
    const dispatch = useDispatch();

    const itemsstate = useSelector((state) => state.getAllitemsReducer);
    //display all the items, error or loading screen depending on the state of webpage
    const { items, error, loading } = itemsstate;
    useEffect(() => {
        dispatch(getAllitems());
    }, []);
    // display list of items in table format 
    return (
        <div className="table-responsive">
            <h2>Items list</h2>
            {loading && (<Loading />)}
            {error && (<Error error='something went wrong' />)}
            <table className="table">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Prices</th>
                        <th>Category</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                {items && items.map((item) => {
                    return <tr key={item._id}>
                        <td>{item.name}</td>
                        <td>
                        Small : {item.prices[0]['small']} <br/>
                        Medium : {item.prices[0]['medium']} <br/>
                        Large : {item.prices[0]['large']} <br/>
                        </td>
                        <td>{item.category}</td>
                        <td>
                        <i className="fa fa-trash" onClick={()=> {dispatch(deleteItem(item._id))}}/>
                            <Link to={`/admin/edititem/${item._id}`}><i className="fa fa-edit" /></Link>
                        </td>
                    </tr>
                })}
            </table>
        </div>);
}

export default Itemslist;