// User jsx
import React from 'react';
import { connect } from 'react-redux';

function UserList(props) {
    let { session } = props;
    if (session) {
        let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
        return <div className="row">
            <div className="col-12">
                <br></br>
                <h2>List of Users:</h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Admin?</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </div>
        </div>;
    } else {
        return <div> <h3>You Must Login To See Users!</h3> </div>
    }
}

function User(props) {
    let { user } = props;
    return <tr>
        <td>{user.email}</td>
        <td>{user.admin ? "yes" : "no"}</td>
    </tr>;
}

export default connect((state) => { return { users: state.users, session: state.session }; })(UserList);