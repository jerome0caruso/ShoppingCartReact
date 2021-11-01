import React, { useState, useEffect } from 'react'
import UserCard from '../components/UserCard';
import '../index.css';

const User = (props) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        let mounted = true;
        fetch(`https://kekambas-bs.herokuapp.com/api/users`)
            .then(repsonse => repsonse.json())
            .then (data => {
                if(mounted) {
                    console.log(data)
                    setUsers(data)
                }})
                return function cleanUp(){
                    mounted = false
                }
            },[])
    return (
        <>
        
        <div className="mainProducts">
            <h1>All Users</h1>
         </div>
         <div className="w-75 mx-auto">
            {users.map((user, key) => <UserCard user={user} key={key}/>)}
         </div>
         
        </>

    )
}

export default User; 