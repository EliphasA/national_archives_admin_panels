import axios from 'axios'; //npm install axios --save
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function ListUser() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  // function getUsers() {
  //     axios.get('http://localhost/national_archives_admin_panel/')
  //         .then(function (response) {
  //             console.log(response.data.message);
  //             setUsers(response.data.message);
  //         })
  //         .catch(function (error) {
  //             console.log(error);
  //             // Handle error, set appropriate state or show an error message
  //         });
  // }

  function getUsers() {
    axios
      .get('http://localhost/national_archives_admin_panel/api/getUsers.php')
      .then(function (response) {
        console.log(response.data);
        setUsers(response.data);
      })
      .catch(function (error) {
        console.log(error);
        // Handle error, set appropriate state or show an error message
      });
  }

  // const deleteUser = (id) => {
  //     axios.delete(`http://localhost/national_archives_admin_panel/index.php/${id}/delete`).then(function (response) {
  //         console.log(response.data.message);
  //         getUsers();
  //     });
  // }

  // const deleteUser = (id) => {
  //     axios.delete(`'http://localhost/app/index.php/${id}/delete`).then(function (response) {
  //         console.log(response.data.message);
  //         getUsers();
  //     });
  // }

  return (
    <div className="row">
      <div className="col-12">
        <h1>List Users</h1>
        {/* <table className="table table-bordered table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(users) ? (
                            users.map((user, key) => (
                                <tr key={key}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.mobile}</td>
                                    <td>
                                        <Link to={`user/${user.id}/edit`} className="btn btn-success" style={{ marginRight: "10px" }}>Edit</Link>
                                        <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="5">No users found.</td>
                            </tr>
                        )}
                    </tbody>
                </table> */}

        <table className="table table-bordered table-striped">
          {/* ... */}
          <thead>
            <tr>
              <th>#</th>
              <th>Username</th>
              <th>Full_Name</th>
              <th>Email</th>
              <th>Cellphone_Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(users) ? (
              users.map((user, key) => (
                <tr key={key}>
                  <td>{user.User_id}</td>
                  <td>{user.Username}</td>
                  <td>{user.Full_Name}</td>
                  <td>{user.Email}</td>
                  <td>{user.Cellphone_Number}</td>
                  <td>
                    <Link
                      to={`user/${user.id}/edit`}
                      className="btn btn-success"
                      style={{ marginRight: '10px' }}
                    >
                      Edit
                    </Link>
                    {/* <button onClick={() => deleteUser(user.id)} className="btn btn-danger">Delete</button> */}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="5">No users found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
