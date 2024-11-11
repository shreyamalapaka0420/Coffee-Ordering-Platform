import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterItems } from "../actions/itemActions";

export default function Filter() {
  //alert boxes to display specific errors
  const [searchkey, setsearchkey] = useState("");
  const [category, setcategory] = useState("all");
  const dispatch = useDispatch();
  return (
    <div className="container ">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <input
            onChange={(e) => {
              setsearchkey(e.target.value);
            }}
            value={searchkey}
            type="text"
            className="form-control"
            placeholder="Search here"
          />
        </div>
        <div className="col-md-2 mt-2">
          <select
            onChange={(e) => {
              setcategory(e.target.value);
            }}
            value={category}
            className="form-control"
          >
            <option value="all"> ALL</option>
            <option value="coffee"> Coffee</option>
            <option value="tea"> Tea</option>
            <option value="sandwiches"> Sandwiches</option>
            <option value="coldbrew"> Cold Brew </option>
          </select>
        </div>
        <div className="col-md-2">
          <button
            className="btn mt-2 bg-dark text-light"
            onClick={() => dispatch(filterItems(searchkey, category))}
          >
            {" "}
            FILTER
          </button>
        </div>
      </div>
    </div>
  );
}
