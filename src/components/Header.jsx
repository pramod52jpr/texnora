import React from 'react'
import '../css/header.css'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <header style={{overflow:"hidden"}}>
            <div className="logo" data-aos="fade-right">
                <img src="../../../assets/texnora-logo.png" alt="" />
            </div>
            <nav className="navbar navbar-expand-lg " data-aos="fade-left">
                <div className="container-fluid" style={{ justifyContent: "flex-end" }}>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav" style={{ alignItems: "flex-end" }}>
                            <Link className="nav-link active" aria-current="page" to={"/"}>Home</Link>
                            <Link className="nav-link active" aria-current="page" to={"/categories"}>Products</Link>
                            <Link className="nav-link active" aria-current="page" to={"/about-us"}>About Us</Link>
                            <Link className="nav-link active" aria-current="page" to={"/contact-us"}>Contact Us</Link>
                        </div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
