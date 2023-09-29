import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const navigate = useNavigate();
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setData({...data, [e.target.name]: e.target.value})

        console.log(data);
    }

    const submitForm = (e) => {
        e.preventDefault();
       const sendData = {
            first_name:data.first_name,
            last_name:data.last_name,
            email:data.email,
            password:data.password,
        }

        console.log(sendData);

        axios.post('http://localhost/mindsinaction_admin_panel/authentication.php', sendData).then((result) => {
            if (result.data.Status === "Invalid") {
                alert("Invalid User");
            }
            else {
                navigate(`/Login`);
            }      
        })
    }

    return (
        <form onSubmit={submitForm}>
            <div className="form-group">
                <label for="exampleInputEmail1">First Name</label>
                <input type="name" name='first_name' className="form-control" id="exampleInputName1" placeholder="Enter first name" 
                onChange={handleChange} value={data.first_name}
                />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Last Name</label>
                <input type="name" name='last_name' className="form-control" id="exampleInputName2" placeholder="Enter last name" 
                onChange={handleChange} value={data.last_name}
                />
            </div>
            <div className="form-group">
                <label for="exampleInputEmail1">Email address</label>
                <input type="email" name='email' className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" 
                onChange={handleChange} value={data.email}
                />
            </div>
            <div className="form-group">
                <label for="exampleInputPassword1">Password</label>
                <input type="password" name='password' className="form-control" id="exampleInputPassword1" placeholder="Password" 
                onChange={handleChange} value={data.password}
                />
            </div>
            <button type="submit" className="btn btn-success mt-3">Register</button>
        </form>
    )
}

export default Register