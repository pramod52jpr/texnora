import React from 'react'
import '../css/footer.css'

export default function Footer() {
  return (
    <footer>
      <div className="footerContainer">
        <div className="footerAbout">
          <img src="../../../assets/texnora-logo.png" alt="" />
          <div className="content">
            <p>Welcome to our home textile manufacturing company from India! We are a leading manufacturer and exporter of high-quality home textile products. With years of experience in the industry, we have established ourselves as a trusted name in the market.</p>
            <a href="#">Learn More</a>
          </div>
        </div>
        <div className="footerProducts">
          <h1>Products</h1>
          <div className="content">
            <a href="#">Kids Ponchos</a>
            <a href="#">Pillow covers</a>
            <a href="#">Kids bath robes</a>
            <a href="#">Hooded Towels</a>
            <a href="#">Bags</a>
            <a href="#">Table runner</a>
            <a href="#">Sofa cover</a>
            <a href="#">Bed covers</a>
            <a href="#">Kitchen apron</a>
            <a href="#">Table cloth</a>
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
        <a href="#">Home</a>
        <a href="#">Products</a>
        <a href="#">About Us</a>
        <a href="#">Contact Us</a>
      </div>
    </footer>
  )
}
