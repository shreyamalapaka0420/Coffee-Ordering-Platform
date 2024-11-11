import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addItem } from "../actions/itemActions";
import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

const Additem = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState("");
  const [smallPrice, setSmallPrice] = useState();
  const [mediumPrice, setMediumPrice] = useState();
  const [largePrice, setLargePrice] = useState();
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();

  const addItemState = useSelector((state) => state.addItemReducer);
  const { success, error, loading } = addItemState;

  function handleSubmit(e) {
    e.preventDefault(); //prevent page from reloading  on clicking the submit button and save form content in object format

    const item = {
      name,
      image,
      description,
      category,
      prices: {
        small: smallPrice,
        medium: mediumPrice,
        large: largePrice,
      },
    };

    dispatch(addItem(item));
  }
  //  form to add new item
  return (
    <div>
      <div className="text-left">
        <h2>Add item</h2>

        {loading && <Loading />}
        {error && <Error error="Something went wrong" />}
        {success && <Success success="New item added" />}
        <form onSubmit={handleSubmit}>
          <input
            className="form-control"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Small item price"
            value={smallPrice}
            onChange={(e) => {
              setSmallPrice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Medium item price"
            value={mediumPrice}
            onChange={(e) => {
              setMediumPrice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Large item price"
            value={largePrice}
            onChange={(e) => {
              setLargePrice(e.target.value);
            }}
          />
          <input
            className="form-control"
            type="text"
            placeholder="Image URL"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => {
              setDescription(e.target.value);
            }}
          />

          <input
            className="form-control"
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => {
              setCategory(e.target.value);
            }}
          />
          <button className="btn bg-dark mt-3" type="submit">
            Add Item
          </button>
        </form>
      </div>
    </div>
  );
};

export default Additem;
