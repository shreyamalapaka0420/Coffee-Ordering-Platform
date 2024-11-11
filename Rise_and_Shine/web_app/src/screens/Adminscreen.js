import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux";
import Additem from './Additem';
import Itemslist from './Itemslist';
import Orderslist from './Orderslist';
import Userslist from './Userslist';
import { BrowserRouter, Route, Link, Switch } from "react-router-dom";
import EditItem from './EditItem';
 


const Adminscreen = () => {

    const userState = useSelector((state) => state.loginUserReducer);  //checks if user is logged in 
    const { currentUser } = userState;
    const dispatch = useDispatch();

    useEffect(() => {            //if login credentials are of admin then send admin to admin screen
        if (currentUser==null || !currentUser.isAdmin) {
            window.location.href = '/';
        }

    }, [])

    return (
        <div>
            <div className="row justify-content-center ">
                <div className="col-md-10">
                    <h2>Admin Panel</h2>

                    <ul className='adminfunctions bg-dark'>
                        <li><Link to={'/admin/userslist'} className='link'>Users</Link></li>
                        <li><Link to={'/admin/itemslist'} className='link'>Items</Link></li>
                        <li><Link to='/admin/additem' className='link'>Add new item</Link></li>
                        <li><Link to='/admin/orderslist' className='link'>Orders</Link></li>

                    </ul>
                     {/* routes to different screens */}
                    <Switch>
                        <Route path='/admin/' component={Userslist} exact></Route>
                        <Route path='/admin/userslist' component={Userslist} exact></Route>
                        <Route path='/admin/itemslist' component={Itemslist} exact></Route>
                        <Route path='/admin/additem' component={Additem} exact></Route>
                        <Route path='/admin/orderslist' component={Orderslist} exact></Route>
                        <Route path='/admin/edititem/:itemid' component={EditItem} exact></Route>


                    </Switch>

                </div>
            </div>

        </div>);
}

export default Adminscreen;