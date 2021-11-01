import React, { useState, useEffect } from 'react'
import MyCartCard from '../components/MyCartCard';
import { useHistory } from "react-router-dom";
import '../index.css';

const MyCart = (props) => {
    const myHeaders = new Headers();
    
    myHeaders.append("Authorization", `Bearer ${props.token}`);
    const [myCart, setMyCart] = useState([]);
    useEffect(() => {
        let mounted = true;
        fetch("https://kekambas-bs.herokuapp.com//api/my-cart", {
            method: 'GET',
            headers: myHeaders,
        }).then(repsonse => repsonse.json())
          .then (data => {
                if(mounted) {
                    console.log(data.cart)
                    setMyCart(data.cart)
                }})
                return function cleanUp(){
                    mounted = false
                }
            }, [])
    const history = useHistory();
    const handleDelete = (id) => {
            fetch(`https://kekambas-bs.herokuapp.com/api/remove-from-cart/${id}`, {
                method: 'POST',
                headers: myHeaders,
            }).then(repsonse => repsonse.json())
              .then (data => {
                props.qty[id] > 1 ? alert("All items have been deleted! ") : alert("Item has been deleted! ");
                props.qty[id] = 0;
                const handleRoute = () =>{ 
                    history.push("/");
                  }
                  handleRoute();
        }, [])
    }

    return (
        <div>
            <h1 className="userInfo">{props.username.charAt(0).toUpperCase() + props.username.slice(1) || 'User'}'s Cart</h1>
            <div className="myCart">
                {myCart ?  myCart.map((item, key) => <MyCartCard qty={props.qty[item.id]} item={item} key={key} handleDelete={handleDelete}/>) : null }
            </div>
        </div>

    )
}

export default MyCart; 