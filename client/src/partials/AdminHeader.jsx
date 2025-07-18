import React, {useContext} from 'react'
import { NavLink } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios';

function Header() {

    const { logout } = useContext(AuthContext);

    function handleLogout() {
        axios.get('http://localhost:3000/logout', { withCredentials: true })
            .then((res) => {
                logout();
            })
            .catch(err => console.error(err));
    }

    return (
        <header className="p-3 mb-3 border-bottom">
            {" "}
            <div className="container">
                {" "}
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    {" "}
                    <NavLink
                        href="/"
                        className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none"
                    >
                        {" "}
                        <svg
                            className="bi me-2"
                            width={40}
                            height={32}
                            role="img"
                            aria-label="Bootstrap"
                        >
                            <use xlinkHref="#bootstrap" />
                        </svg>{" "}
                    </NavLink>{" "}
                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                        {" "}
                        <li>
                            <NavLink to="/admin/" className="nav-link px-2 link-secondary">
                                Dashboard
                            </NavLink>
                        </li>{" "}
                        <li>
                            <NavLink to="/admin/products" className="nav-link px-2 link-body-emphasis">
                                Products
                            </NavLink>
                        </li>{" "}
                        <li>
                            <NavLink to="/admin/orders" className="nav-link px-2 link-body-emphasis">
                                Orders
                            </NavLink>
                        </li>{" "}
                    </ul>{" "}
                    <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3" role="search">
                        {" "}
                        <input
                            type="search"
                            className="form-control"
                            placeholder="Search..."
                            aria-label="Search"
                        />{" "}
                    </form>{" "}
                    <div className="dropdown text-end">
                        {" "}
                        <a
                            href="#"
                            className="d-block link-body-emphasis text-decoration-none dropdown-toggle"
                            data-bs-toggle="dropdown"
                            aria-expanded="false"
                        >
                            {" "}
                            <img
                                src="https://github.com/mdo.png"
                                alt="mdo"
                                width={32}
                                height={32}
                                className="rounded-circle"
                            />{" "}
                        </a>{" "}
                        <ul className="dropdown-menu text-small" style={{}}>
                            {" "}
                            <li>
                                <a className="dropdown-item" href="#">
                                    New project...
                                </a>
                            </li>{" "}
                            <li>
                                <a className="dropdown-item" href="#">
                                    Settings
                                </a>
                            </li>{" "}
                            <li>
                                <a className="dropdown-item" href="#">
                                    Profile
                                </a>
                            </li>{" "}
                            <li>
                                <hr className="dropdown-divider" />
                            </li>{" "}
                            <li>
                                <a className="dropdown-item" href="#" onClick={handleLogout}>
                                    Sign out
                                </a>
                            </li>{" "}
                        </ul>{" "}
                    </div>{" "}
                </div>{" "}
            </div>{" "}
        </header>

    )
}

export default Header
