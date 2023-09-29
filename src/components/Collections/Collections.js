import React, { useEffect, useState } from 'react';
import dateFormat from 'dateformat';
import Popup from '../../utility/Popup';
import CollectionForm from './CollectionForm/CollectionForm';
import './Collections.css';
import Cookies from 'js-cookie';
import { NavLink, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { AiFillFolderAdd } from 'react-icons/ai';
import { ImBin } from 'react-icons/im';
import { LuEdit } from 'react-icons/lu';

export default function AdminHome() {
  const [openPopup, setOpenPopup] = useState(false);
  const [userData, setUserData] = useState([]);
  const [collectionData, setCollectionData] = useState([]);
  const navigate = useNavigate();

  const getCollections = () => {
    axios
      .get(
        'http://localhost/national_archives_admin_panel/api/collection.php?type=collection'
      )
      .then((response) => {
        console.log(response);
        setCollectionData(response.data);
      })
      .catch((error) => {
        console.log(error);
        window.addEventListener('unhandledrejection', function (event) {
          console.error(
            'Unhandled rejection (promise: ',
            event.promise,
            ', reason: ',
            event.reason,
            ').'
          );
        });
      });
  };

  useEffect(() => {
    setUserData(JSON.parse(Cookies.get('userData')));
    getCollections();
  }, []);

  //Date format function
  function FormatDate({ date }) {
    // var convert_date = Date.parse(date);

    var t = date.split(/[- :]/);

    // Apply each element to the Date function
    var d = new Date(Date.UTC(t[0], t[1] - 1, t[2], t[3] - 2, t[4], t[5]));

    var new_date = new Date(d).toString();
    var formated_date = dateFormat(new_date, 'dddd, mmmm, yyyy, HH:MM:ss');

    return (
      <p className="date">
        {formated_date}
        {/* {new Date(d).toString()} */}
      </p>
    );
  }

  if (sessionStorage.getItem('status') === 'loggedin') {
    return (
      <div className="admin-home">
        <div className="admin-home-container">
          <div className="search-add-image">
            <div className="search">
              <input type="search" placeholder="Search...." />
            </div>
            <div className="add-image">
              <NavLink to={'/add-collection'}>
                <button>
                  <AiFillFolderAdd className="add-collection" />
                  Add collection
                </button>
              </NavLink>
            </div>
          </div>
          <Popup
            title="Add collection"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
            <CollectionForm />
          </Popup>
          <table className="table table-bordered table-striped">
            <tr>
              <th>Description Code</th>
              <th>Archive</th>
              <th>Collection</th>
              <th>Institution</th>
              <th>Date</th>
              {userData[3] === 'admin' ? <th>Actions</th> : null}
            </tr>
            {collectionData.map((x, i) => {
              return (
                <tr key={i}>
                  <td>{x.DescriptionCode}</td>
                  <td>{x.Archive}</td>
                  <td>{x.Collection}</td>
                  <td>{x.Institution}</td>
                  {/* <td>{<FormatDate date={x.createdAt} />}</td> */}
                  {userData[3] === 'admin' ? (
                    <td className="d-flex">
                      <button className="edit">
                        <LuEdit className="icon" />
                      </button>{' '}
                      <button className="delete">
                        <ImBin className="icon" />
                      </button>
                    </td>
                  ) : null}
                </tr>
              );
            })}
          </table>
        </div>
      </div>
    );
  } else {
    navigate('/login');
  }
}
