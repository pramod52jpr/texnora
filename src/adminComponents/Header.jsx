import React from 'react'
import '../adminCss/header.css'
import { Link, useNavigate } from 'react-router-dom';

export default function Header(props) {
    const navigate=useNavigate();
    function closeNav() {
        document.getElementById("offcanvasNavbar").classList.remove("show");
        document.body.style.removeProperty("overflow");
        document.body.style.removeProperty("padding-right");
        document.getElementsByClassName("navbar")[0].style.removeProperty("padding-right");
        document.getElementsByClassName("offcanvas-backdrop")[0].remove();
    }
    return (
        <div className="adminHeader">
            <nav className="navbar" style={{backgroundColor:"#D9F8FF"}}>
                <div className="container-fluid">
                    <div className="leftSide">
                        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbar" aria-controls="offcanvasNavbar" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <div className="title">{props.title}</div>
                    </div>
                    <Link className="navbar-brand" to={"/"}>
                        <img src="assets/texnora-logo.png" alt="" />
                    </Link>
                    <div className="offcanvas offcanvas-start" tabIndex="-1" id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" style={{backgroundColor:"#D9F8FF",width:"300px"}}>
                        <div className="offcanvas-header">
                            <h5 className="offcanvas-title" id="offcanvasNavbarLabel"><img width={150} src="assets/texnora-logo.png" alt="" /></h5>
                            <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                        </div>
                        <div className="offcanvas-body" onClick={closeNav}>
                            <ul className="navbar-nav justify-content-end flex-grow-1">
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/dashboard"}><i class="fa-solid fa-house"></i>Dashboard</Link>
                                </li>
                                <h2>Customizable</h2>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/admin-categories"}><i class="fa-solid fa-list"></i>Categories</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/admin-products"}><i class="fa-solid fa-cart-shopping"></i>Products</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/admin-slider-image"}><i class="fa-solid fa-image"></i>Slider Images</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/admin-data"}><i class="fa-solid fa-gear"></i>Admin User</Link>
                                </li>
                                <h2>Data</h2>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/admin-quote-datas"}><i class="fa-solid fa-quote-right"></i>Quotes</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/admin-custom-requirements"}><i class="fa-solid fa-cart-shopping"></i>Requirements</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" to={"/admin-contact-us-data"}><i class="fa-solid fa-address-card"></i>User Enquiries</Link>
                                </li>
                                <hr />
                                <li className="nav-item">
                                    <Link className="nav-link active" aria-current="page" onClick={()=>{
                                        localStorage.clear();
                                        navigate("/admin");
                                    }} to={"/admin"}><i class="fa-solid fa-right-from-bracket"></i>Log Out</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}
