import axios from "axios" //npm install axios --save
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
// import {
//     // IoIosArrowDown,
//     // AiFillHome,
//     // BsFillInfoSquareFill,
//     // FaBookReader,
//     // RiTeamFill,
//     // FaShoppingCart,
//     // MdContactPhone,
//     // VscThreeBars,
//     FaTimes,
//     TiTick,
//   } from "react-icons/all";

import { Link } from "react-router-dom";

export default function ViewBookings() {

    //const navigate = useNavigate();
 
    const [inputs, setInputs] = useState([]);
 
    const {id} = useParams();

    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        getBookings();
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

    function getBookings() {
        axios.get('http://localhost/app/getAllBookingDetails.php')
            .then(function (response) {
                console.log(response.data);
                setBookings(response.data);
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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}));
    }

    const approveBooking = (event) => {
        event.preventDefault();
 
        axios.put(`http://localhost/app/bookingStatus.php/${id}/edit`, inputs).then(function(response){
            console.log(response.data);
            // navigate('/');
        });
         
    }

    const handleUpdateStatus = () => {
        const user_id = 123; // Replace this with the actual user_id you want to update
        const updatedData = {
          user_id,
          Booking_Status: 'Approved', // The updated Booking_Status value
        };
    
        // Send the updated data to PHP using fetch or axios
        fetch('http://localhost/national_archives_admin_panel/bookingStatus.php', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(updatedData),
        })
          .then((response) => response.json())
          .then((data) => {
            // Handle the response data (updated data) from PHP
            console.log(data);
          })
          .catch((error) => {
            console.error('Error:', error);
          });
      };

      const [bookingStatus, setBookingStatus] = useState('');

  const handleUpdateStatus1 = (id) => {
    const referenceNumber = id; // Replace this with the actual Reference_Number you want to update
    const updatedData = {
      Reference_Number: referenceNumber,
      Booking_Status: 'Approved', // The updated Booking_Status value
    };

    // Send the updated data to PHP using fetch or axios
    fetch('http://localhost/app/bookingStatus.php/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response data (updated data) from PHP
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

    return (
        <div className="row">
            <div className="col-12">
                <h1>View Bookings</h1>
                <table className="table table-bordered table-striped">
                    {/* ... */}
                    <thead>
                        <tr>
                            <th>Reference Number</th>
                            <th>Address</th>
                            <th>Institution</th>
                            <th>Mobile</th>
                            <th>Topic</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Array.isArray(bookings) ? (
                            bookings.map((booking, key) => (
                                <tr key={key}>
                                    <td>{booking.Reference_Number}</td>
                                    <td>{booking.Address}</td>
                                    <td>{booking.Institution}</td>
                                    <td>{booking.Cellphone_Number}</td>
                                    <td>{booking.Topic}</td>
                                    <td>{booking.Book_Date}</td>
                                    <td>{booking.Time}</td>
                                    <th>{booking.Booking_Status}</th>
                                    <td>
                                        <Link className="btn btn-success" onClick={handleUpdateStatus1(booking.id)} style={{ marginRight: "10px" }}>
                                            {/* <TiTick/> */}
                                            Approve
                                            </Link>
                                        {/* <button onClick={() => deletebooking(booking.id)} className="btn btn-danger"><FaTimes/></button> */}
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
    )
}