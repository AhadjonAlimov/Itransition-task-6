import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';


export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate("/login");
    }

    return (
        <>
            {
                location.pathname !== '/login' && (
                    <nav className="navbar navbar-expand navbar-light bg-light fixed-top">
                        <div className="container">
                            <a className="navbar-brand me-2" href="/">
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-mdb-toggle="collapse"
                                data-mdb-target="#navbarButtonsExample"
                                aria-controls="navbarButtonsExample"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <i className="fas fa-bars"></i>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarButtonsExample">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                                    <li className="nav-item h5">
                                        <a className="nav-link" href="#">TASK 6</a>
                                    </li>
                                </ul>
                                <div className="d-flex align-items-center">
                                    <button type="button" className="btn btn-primary me-3" onClick={handleLogout}>
                                        LOGOUT
                                    </button>
                                </div>
                            </div>
                        </div>
                    </nav>
                )
            }
        </>
    )
}
