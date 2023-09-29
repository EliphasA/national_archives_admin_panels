import React, { useState } from 'react';
import './Login.css';
import { RiLockPasswordFill, RiLoginBoxLine } from 'react-icons/ri';
import { MdEmail } from 'react-icons/md';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import validator from 'validator';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validate_email, set_validate_email] = useState('');
  const [validate_password, set_validate_password] = useState('');

  const navigate = useNavigate();

  //notification
  const success = (msg) => toast.success(msg);
  const errerNotify = (msg) => toast.error(msg);

  const login = () => {
    if (validator.isEmpty(email) && validator.isEmpty(password)) {
      errerNotify('Please provide the required details.');
    }
    if (validator.isEmpty(email)) {
      set_validate_email('Email is required!');
    }
    if (validator.isEmpty(password)) {
      set_validate_password('Password is require!');
    } else {
      if (!validator.isEmail(email)) {
        errerNotify('Please provide a valid email!');
      } else {
        const data = new FormData();
        data.append('email', email);
        data.append('password', password);

        // making API Call
        axios
          .post(
            'https://mindsinaction.com.na/api/national-archives-admin/api.php?type=login',
            data
          )
          .then((res) => {
            // Display the key/value pairs
            for (var pair of data.entries()) {
              console.log(pair[0] + ': ' + pair[1]);
            }
            if (res.data.message === 'success') {
              success('Successfuly logged in');

              Cookies.set('userData', JSON.stringify(res.data.userData));

              //navigating
              setTimeout(() => {
                navigate('/collection');
              }, 2000);

              //setting the user session storage
              sessionStorage.setItem('status', 'loggedin');
            } else if (res.data.message === 'failed') {
              errerNotify('Invalid username or password!');
            }

            console.log(res.data.message);
          })
          .catch((error) => {
            errerNotify(error.message);
          });
      }
    }
  };

  return (
    <div className="login">
      <div className="form">
        <div className="account-icon">
          <h1>Archive Admin Pannel</h1>
        </div>
        <p className="error">
          {validator.isEmpty(email) ? validate_email : null}
        </p>
        <div className="form-control">
          <MdEmail className="icon" />
          <input
            type="email"
            placeholder="Email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>
        <p className="error">
          {validator.isEmpty(password) ? validate_password : null}
        </p>
        <div className="form-control">
          <RiLockPasswordFill className="icon" />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
        </div>
        <button className="sub" onClick={(e) => login()}>
          Login
          <RiLoginBoxLine className="login-icon" />
          <ToastContainer position="top-center" />
        </button>

        <div className="forgot-password">
          <NavLink to={'/forget-password'}>
            Forgot your password? Click here to reset
          </NavLink>
        </div>
      </div>
    </div>
  );
}
