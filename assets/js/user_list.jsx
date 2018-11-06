// User jsx
import React from 'react';

export default function UserList(props) {
    console.log("users")
    console.log(props.users)
    let rows = _.map(props.users, (uu) => <User key={uu.id} user={uu} />);
    return <div className="row">
        <div className="col-12">
            <br></br>
            List of Users:
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
}

function User(props) {
    let { user } = props;
    return <tr>
        <td>{user.email}</td>
        <td>{user.admin ? "yes" : "no"}</td>
    </tr>;
}