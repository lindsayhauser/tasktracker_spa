
import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

export default function Header(props) {
    let { root } = props;
    let session_view;

    if (!root.state.session) {
        session_view = <div className="form-inline my-2">
            <input id="login-email" type="email" placeholder="email" />
            <input id="login-pass" type="password" placeholder="password" />
            <button className="btn btn-secondary" onClick={() => { root.create_session($('#login-email').val(), $('#login-pass').val()) }}>Login</button>
        </div>;
    } else {
        session_view = <div className="form-inline my-2">
            <h5> <div className="col-1"> Welcome: {root.state.session.user_email}</div></h5>
            <div className="col-1"><button className="btn btn-secondary" onClick={() => { root.endSession() }}>Logout</button></div>
        </div>;
    }

    return <div className="form-inline row my-2">
        <div className="col-4">
            <h3><Link to={"/"}>Home</Link></h3>
        </div>
        <div className="form-inline row my-2 col-1">
            <p><Link to={"/tasks"} onClick={root.fetch_tasks.bind(root)}>Tasks</Link></p>
        </div>
        <div className="form-inline row my-2 col-1">
            <p><Link to={"/user"} onClick={root.fetch_users.bind(root)}>Users</Link></p>
        </div>
        <div className="col-6 float-right">
            {session_view}
        </div>
    </div>
}