import React from "react";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getItemById } from "../actions/itemActions";
import { editItem } from "../actions/itemActions";

import Loading from "../components/Loading";
import Error from "../components/Error";
import Success from "../components/Success";

const EditItem = ({ match }) => {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [smallPrice, setSmallPrice] = useState();
    const [mediumPrice, setMediumPrice] = useState();
    const [largePrice, setLargePrice] = useState();
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();
    const itemId = match.params.itemid

    const getItemByIdState = useSelector(state => state.getItemByIdReducer)
    const { item, error, loading } = getItemByIdState
    
    const editItemState = useSelector(state => state.editItemReducer)
    const { editsuccess, editerror, editloading } = editItemState

    useEffect(() => {
        if (item) {
            if (item._id == itemId)
            {
                setName(item.name)
                setImage(item.image)
                setSmallPrice(item.prices[0].small)
                setMediumPrice(item.prices[0].medium)
                setLargePrice(item.prices[0].large)
                setDescription(item.description)
                setCategory(item.category)
            }

            else{
                dispatch(getItemById(itemId))
            }

        }
        else
        dispatch(getItemById(itemId))
    }, [item,dispatch])

    function handleSubmit(e) {
        e.preventDefault();

        const updatedItem = {
            id: itemId,
            name,
            image,
            description,
            category,
            prices: {
                small: smallPrice,
                medium: mediumPrice,
                large: largePrice
            },
        }
        dispatch(editItem(updatedItem))
    }

    return (
        <div>
            <div className="text-left">
                <h2>Edit item</h2>
                {loading && (<Loading />)}
                {error && (<Error error='Something went wrong' />)}
                {editsuccess && (<Success success="Item edited successfully!" />)}
                <form onSubmit={handleSubmit}>
                    <input
                        className="form-control"
                        type='text'
                        placeholder="name"
                        value={name}
                        onChange={(e) => {
                            setName(e.target.value)
                        }}
                    />
                    <input
                        className="form-control"
                        type='text'
                        placeholder="small item prize"
                        value={smallPrice}
                        onChange={(e) => {
                            setSmallPrice(e.target.value)
                        }}
                    />
                    <input
                        className="form-control"
                        type='text'
                        placeholder="medium item price"
                        value={mediumPrice}
                        onChange={(e) => {
                            setMediumPrice(e.target.value)
                        }}
                    />
                    <input
                        className="form-control"
                        type='text'
                        placeholder="large item price"
                        value={largePrice}
                        onChange={(e) => {
                            setLargePrice(e.target.value)
                        }}
                    />
                    <input
                        className="form-control"
                        type='text'
                        placeholder="image url"
                        value={image}
                        onChange={(e) => {
                            setImage(e.target.value)
                        }}
                    />

                    <input
                        className="form-control"
                        type='text'
                        placeholder="description"
                        value={description}
                        onChange={(e) => {
                            setDescription(e.target.value)
                        }}
                    />

                    <input
                        className="form-control"
                        type='text'
                        placeholder="category"
                        value={category}
                        onChange={(e) => {
                            setCategory(e.target.value)
                        }}
                    />
                    <button className="btn bg-primary text-light mt-2" type="submit">Edit Item</button>
                </form>
            </div>
        </div>);

}

export default EditItem;