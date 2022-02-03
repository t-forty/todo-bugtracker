import React from 'react'
import { Link } from 'react-router-dom';

export default function Undefined(props){
    return (
        <div>
            <h2>Route Undefined: {props.route}</h2>
            <Link to="/">Site HOME</Link>
        </div>
    )
}
