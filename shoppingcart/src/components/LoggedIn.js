import React from "react";
import { Link } from 'react-router-dom';

export const LoggedIn = (props) => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/users">Users</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/myCart">My Cart</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/myPage">My Page</Link>
            </li>
         </>
    )
}