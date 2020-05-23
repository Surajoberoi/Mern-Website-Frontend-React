import React,{useState,useEffect} from 'react'
import { isAuthenticated } from '../auth/helper';
import { cartEmpty, loadCart } from './helper/cartHelper';
import { Link } from 'react-router-dom';
import StripeCheckoutButton from "react-stripe-checkout"
import { API } from '../backend';
import { createOrder } from './helper/Orderhelper';
import {NotificationContainer, NotificationManager} from 'react-notifications';

const NotificationContainer = window.ReactNotifications.NotificationContainer;
const NotificationManager = window.ReactNotifications.NotificationManager;

const StripeCheckout = ({
    products,
    setReload = f =>f,
    reload=undefined
}) => {


    const [data, setData] = useState({
        loading:false,
        success: false,
        error: "",
        address:""
    });


    const user_token = isAuthenticated() && isAuthenticated().token
    const userId = isAuthenticated() && isAuthenticated().user._id

    const getFinalAmount = () => {
        let amount = 0
        products.map(p => {
            amount = amount + p.price
        })
        return amount;
    };


    const makePayment = (token) => {
        const body = {
            token,
            products,
        }

        const headers = {
            "Content-Type":"application/json"
        }
        return fetch(`${API}payment`,{
            method:"POST",
            headers,
            body:JSON.stringify(body)
        }).then(response=>{
            console.log(response)
            const { status } = response;
            console.log("Payment Successful")
            console.log("TOKEN ID",token.id)
            
            const orderData = {
                products: products,
                transaction_id:token.id,
                amount:getFinalAmount()
            }
            createOrder(userId,user_token,orderData)
            cartEmpty(() =>{
                NotificationManager.success('Payment Successful', 'Information');
                console.log("Empty the cart")
            });
            setReload(!reload)

        }).catch(error=>console.log(error))
    }

    const showStripeButton = () => {
        return isAuthenticated() ? (
           <StripeCheckoutButton
           stripeKey={process.env.REACT_APP_PublishKey}
           token={makePayment}
           amount={getFinalAmount() * 100 }
           name="Pay Here"
           shippingAddress
           billingAddress
           >
            <button className="btn btn-success">Pay with Stripe</button>
            </StripeCheckoutButton>
        ) : (
            <Link to="/signin">
                <button className="btn btn-warning">SignIn</button>
            </Link>
        )
    }



    return (
        <div>
            <h3 className="text-white">Stripe Checkout {getFinalAmount()}</h3>
            {showStripeButton()}
        </div>
    )
}

export default StripeCheckout;