// User jsx
import React from 'react';

export default function UserList(props) {
    let { root } = props;
    console.log(root.state.session)
    if (root.state.session) {
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
        return <div> You Must Login To See Tasks! </div>
    }
}

function User(props) {
    let { user } = props;
    return <tr>
        <td>{user.email}</td>
        <td>{user.admin ? "yes" : "no"}</td>
    </tr>;
}