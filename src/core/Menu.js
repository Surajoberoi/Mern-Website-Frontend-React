import React, {Fragment} from 'react'
import {Link, withRouter} from "react-router-dom"
import { signout, isAuthenticated } from '../auth/helper'


/* This method is for active Menu bar tab.
History is given to us by Link
*/
const currentTab =  (history, path) => {
    if(history.location.pathname===path){
        console.log(history.location.pathname, path)
        return {color:"#FFFFFF"}
    } else {
        return({color:"#F4C724"})
    }
}


const Menu = ({history}) => (
    <div>
        <ul className="nav nav-tabs bg dark">
            <li className="nav-item">
                <Link style={currentTab(history,"/")}className="nav-link" to="/">
                    Home
                </Link>
            </li>
            <li className="nav-item">
                <Link style={currentTab(history,"/cart")} className="nav-link" to="/cart">
                    Cart
                </Link>
            </li>
            {isAuthenticated() && isAuthenticated().user.role === 0 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/user/dashboard")} className="nav-link" to="/user/dashboard">
                   User Dashboard
                </Link>
            </li>
            )}
            {isAuthenticated() && isAuthenticated().user.role === 1 && (
                <li className="nav-item">
                <Link style={currentTab(history,"/admin/dashboard")} className="nav-link" to="/admin/dashboard">
                   Admin Dashboard
                </Link>
            </li>
            )}
            {!isAuthenticated() && (
                <Fragment>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signup")} className="nav-link" to="/signup">
                        SignUp
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style={currentTab(history,"/signin")} className="nav-link" to="/signin">
                        SignIn
                    </Link>
                </li>
                </Fragment>
            )}
            {isAuthenticated() && (
                <li className="nav-item">
                <span className="nav-link text-warning"
                onClick={()=>{
                    signout(()=>{
                        history.push("/")
                    })
                }}
                >
                    SignOut
                </span>
            </li>
            )}
        </ul>
    </div>
)
  

export default withRouter(Menu);


/*
its going to pick up all the routes using the link from
from routes.js 
*/