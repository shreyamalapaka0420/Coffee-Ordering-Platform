import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllitems } from "../actions/itemActions";
import Item from "../components/Item";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Filter from "../components/Filter"

//use get all items reducer to display all the items on homescreen
export default function Homescreen() {
  const dispatch = useDispatch();

  const itemsstate = useSelector((state) => state.getAllitemsReducer);
   //display all the items, error or loading screen depending on the state of webpage  
  const { items, error, loading } = itemsstate;
  useEffect(() => {      
    dispatch(getAllitems());
  }, []);

  return (
    <div>
      <h1><b>CHECK OUT OUR MENU FOR SOME DELICIOUS OPTIONS THAT WILL SATISFY YOUR CRAVINGS.</b></h1>
      <Filter />
      <div className="row justify-content-center">
        
        {loading ? (
          <Loading />
        ) : error ? (
          <Error />
        ) : (
          items.map((item) => {
            return (
              <div className="col-md-3 p-4" key={item._id}>
                <div>
                  <Item item={item} />
                </div>
              </div>
            );
          })
        )}
        {}
      </div>
    </div>
  );
}
