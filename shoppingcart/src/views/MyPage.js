import React, { useState, useEffect } from 'react'
import '../index.css'
import Me from '../components/Me'
const User = (props) => {
    const [username, setUsername] = useState(props.username);
    const myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${props.token}`);
    const [me, setMe] = useState([]);
    useEffect(() => {
        let mounted = true;
        fetch(`https://kekambas-bs.herokuapp.com/api/users/me`, {
            method: 'GET',
            headers: myHeaders,
        }).then(repsonse => repsonse.json())
          .then (data => {
                if(mounted) {
                    console.log(data)
                    setMe(data)
                    setUsername(props.username)
                }})
                return function cleanUp(){
                    mounted = false
                }
            }, [])
    return (
        <div className="userInfo">
            <h1>{username.charAt(0).toUpperCase() + username.slice(1) || 'User'}'s User Info</h1>
            <h2>{me ? <Me u={me.username} fn={me.first_name} ln={me.last_name} e={me.email} id={me.id} token={props.token} logout={props.logout}/>: null}</h2> 
        </div>
    )
}

export default User; 