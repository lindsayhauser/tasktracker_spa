
import React from 'react';
import { Link } from 'react-router-dom';

export default function Header(props) {
    let {root} = props;

    // console.log("IN THE HEADER")
    // console.log(root)

    let session_view = <div className="form-inline my-2">
        <input id="login-email" type="email" placeholder="email" />
        <input id="login-pass" type="password" placeholder="password" />
        <button className="btn btn-secondary">Login</button>
    </div>;

    return <div className="row my-2">
        <div className="col-4">
            <h3><Link to={"/"}>Home</Link></h3>
        </div>
        <div className="col-1">
            <p><Link to={"/tasks"} onClick={root.fetch_tasks.bind(root)}>Tasks</Link></p>
        </div>
        <div className="col-1">
            <p><Link to={"/user"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
        </div>
    </div>
}