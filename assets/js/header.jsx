
import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';
import api from './api';
import { connect } from 'react-redux';

function Header(props) {
    let { root, session } = props;
    console.log(session)
    let session_view;
    if (!session) {
        session_view = <div className="form-inline my-2">
            <input id="login-email" type="email" placeholder="email" />
            <input id="login-pass" type="password" placeholder="password" />
            <button className="btn btn-secondary" onClick={() => { api.create_session($('#login-email').val(), $('#login-pass').val()) }}>Login</button>
        </div>;
    } else {
        session_view = <div className="form-inline my-2">
            <h5> <div className="col-1"> Welcome: {session.data.user_email}</div></h5>
            <div className="col-1"><button className="btn btn-secondary" onClick={() => { api.endSession() }}>Logout</button></div>
        </div>;
    }

    return <div className="form-inline row my-2">
        <div className="col-4">
            <h3><Link to={"/"}>Home</Link></h3>
        </div>
        <div className="form-inline row my-2 col-1">
            <p><Link to={"/tasks"} onClick={api.fetch_tasks()}>Tasks</Link></p>
        </div>
        <div className="form-inline row my-2 col-1">
            <p><Link to={"/user"} onClick={api.fetch_users()}>Users</Link></p>
        </div>
        <div className="col-6 float-right">
            {session_view}
        </div>
    </div>
}

const mapStateToProps = state => {
    return {
      session: state.session
    };
  };
  export default connect(mapStateToProps)(Header);