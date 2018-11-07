// Home jsx
import React from 'react';
import { Link, BrowserRouter as Router, Route } from 'react-router-dom';

export default function Register(props) {

    let { root } = props;

    return <div>
        <input id="register-email" type="email" placeholder="email" />
        <input id="register-pass" type="password" placeholder="password" />
        <div><Link to={"/tasks"} className="btn btn-secondary"
            onClick={() => { root.create_user($('#register-email').val(), $('#register-pass').val()) }}>
            Register</Link></div>
    </div>

}