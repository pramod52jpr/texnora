import React, { useEffect, useState } from 'react'
import '../css/footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  const [allProductData, setAllProductData] = useState([]);
  async function fetchProducts() {
    const token = process.env.REACT_APP_TOKEN;
    const apiUrl = process.env.REACT_APP_PRODUCT_API;
    await fetch(apiUrl, {
      headers: { token }
    }).then(res => res.json()).then((res) => {
      setAllProductData(res.data);
    }).catch((e) => {
      console.log("the error is " + e);
    });
  }

  useEffect(() => {
    fetchProducts();
  }, []);
  return (
    <footer style={{ overflow: "hidden" }}>
      <div className="footerContainer">
        <div className="footerAbout" data-aos="fade-right">
          <img src="../../../assets/texnora-logo.png" alt="" />
          <div className="content">
            <p>Welcome to our home textile manufacturing company from India! We are a leading manufacturer and exporter of high-quality home textile products. With years of experience in the industry, we have established ourselves as a trusted name in the market.</p>
            <Link to={"/about-us"}>Learn More</Link>
          </div>
        </div>
        <div className="footerProducts" data-aos="zoom-out">
          <h1>Products</h1>
          <div className="content">
            {
              allProductData.slice(0, allProductData.length > 6 ? 6 : allProductData.length).map(element => <Link key={element.id} to={`/product-details/${element.cid}/${element.id}`}>{element.name}</Link>)
            }
          </div>
        </div>
        <div className="footerContact" data-aos="fade-left">
          <h1>Contact Us</h1>
          <p>Reg. Office: 4/46-A, Sadaiyam palayam, Andankovil Melbagam, Karur-India-639008</p>
          <p>Ph: <a href="tel:+919360057155">+91 93600 57155</a></p>
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
