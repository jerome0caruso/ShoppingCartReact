import React from "react";
import { Link } from 'react-router-dom';

export const LoggedOut = (props) => {
    return (
        <>
            <li className="nav-item">
                <Link className="nav-link" to="/register">Register</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" to="/login">Login</Link>
            </li>
        </>
    )
}