import React, { useEffect, useState } from 'react';
import { SidebarData } from './SidebarData';
import { MdOutlineCancelPresentation } from 'react-icons/md';
import profile_holder from '../../images/profile.png';
import { FaBars } from 'react-icons/fa';
import './Sidebar.css';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { RiLogoutBoxRFill } from 'react-icons/ri';

export default function Sidebar() {
  const [userData, setUserData] = useState([]);
  const navigate = useNavigate();

  const logout = () => {
    //clearing the user cookie
    Cookies.remove('userData');

    //clearing the session storage
    sessionStorage.removeItem('status');

    //navigating to the login page
    navigate('/');
  };

  useEffect(() => {
    if (Cookies.get('userData') !== undefined) {
      setUserData(JSON.parse(Cookies.get('userData')));
    }
  }, [navigate]);

  if (sessionStorage.getItem('status') === 'loggedin') {
    return (
      <body>
        <input type="checkbox" id="check" />
        <label for="check">
          <FaBars id="btn" />
          <MdOutlineCancelPresentation id="cancel" />
        </label>
        <div className="slidebar">
          <header className="profile-main">
            <div className="image">
              <img
                src={
                  userData[4] === ''
                    ? profile_holder
                    : 'https://mindsinaction.com.na/api/national-archives-admin/user-profiles/' +
                      userData[4]
                }
                alt=""
              />
              <p className="profile-name">
                {userData[1]} <br />
                <span className="email">{userData[2]}</span>
              </p>
            </div>
          </header>
          <ul className="links">
            {SidebarData.map((val, key) => {
              return (
                <li>
                  <NavLink to={val.link} className="active">
                    <i class="menu-icons" aria-hidden="true">
                      {val.icon}
                    </i>
                    {val.title}
                  </NavLink>
                </li>
              );
            })}
          </ul>
          <div className="logout-btn-container">
            <button onClick={(e) => logout()} className="logout">
              Logout <RiLogoutBoxRFill id="logout" />
            </button>
          </div>
        </div>
      </body>
    );
  } else {
    navigate('/');
  }
}
