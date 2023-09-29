import React from 'react';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

export default function Navbar() {
  return (
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasDarkNavbar"
          aria-controls="offcanvasDarkNavbar"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="offcanvas offcanvas-start bg-dark text-white"
          tabIndex="-1"
          id="offcanvasDarkNavbar"
          aria-labelledby="offcanvasDarkNavbarLabel"
        >
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasDarkNavbarLabel">
              Dark offcanvas
            </h5>
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav">
              <li className="nav-item">
                <Link className="nav-link active" to="/"> {/* Use Link component */}
                  Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/bookings"> {/* Use Link component */}
                  Bookings
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/register"> {/* Use Link component */}
                  Register
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login"> {/* Use Link component */}
                  Login/Logout
                </Link>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >  {/* Use Link component */}
                  Dropdown
                </Link>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li>
                    <Link className="dropdown-item" to="/action"> {/* Use Link component */}
                      Action
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/another-action"> {/* Use Link component */}
                      Another action
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link className="dropdown-item" to="/something-else"> {/* Use Link component */}
                      Something else here
                    </Link>
                  </li>
                </ul>
              </li>
            </ul>
            <form className="d-flex mt-3" role="search">
              <input
                className="form-control me-2"
                type="search"
                placeholder="Search"
                aria-label="Search"
              />
              <button className="btn btn-success" type="submit">
                Search
              </button>
            </form>
          </div>
        </div>
        <Link className="navbar-brand" to="/"> {/* Use Link component */}
          National Archives Admin Panel
        </Link>
      </div>
    </nav>
  );
}
