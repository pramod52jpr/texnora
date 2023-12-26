import React from 'react'
import '../css/footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="footerAbout">
          <img src="../../../assets/texnora-logo.png" alt="" />
          <div className="content">
            <p>Welcome to our home textile manufacturing company from India! We are a leading manufacturer and exporter of high-quality home textile products. With years of experience in the industry, we have established ourselves as a trusted name in the market.</p>
            <Link to={"/about-us"}>Learn More</Link>
          </div>
        </div>
        <div className="footerProducts">
          <h1>Products</h1>
          <div className="content">
            <Link to={""}>Kids Ponchos</Link>
            <Link to={""}>Pillow covers</Link>
            <Link to={""}>Kids bath robes</Link>
            <Link to={""}>Hooded Towels</Link>
            <Link to={""}>Bags</Link>
            <Link to={""}>Table runner</Link>
            <Link to={""}>Sofa cover</Link>
            <Link to={""}>Bed covers</Link>
            <Link to={""}>Kitchen apron</Link>
            <Link to={""}>Table cloth</Link>
          </div>
        </div>
        <div className="footerContact">
          <h1>Contact Us</h1>
          <p>Reg. Office: 4/46-A, Sadaiyam palayam, Andankovil Melbagam, Karur-India-639008</p>
          <p>Ph: <a href="tel:+91 93600 57155">+91 93600 57155</a></p>
          <p>Email: <a href="mailto:kru.texnora@gmail.com">kru.texnora@gmail.com</a></p>
        </div>
      </div>
      <hr />
      <div className="footerNav">
        <Link to={"/"}>Home</Link>
        <Link to={"/categories"}>Products</Link>
        <Link to={"/about-us"}>About Us</Link>
        <Link to={"/contact-us"}>Contact Us</Link>
      </div>
    </footer>
  )
}
