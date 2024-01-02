import React, { useEffect, useState } from 'react'
import '../css/footer.css'
import ReactLoading from 'react-loading';
import { Link } from 'react-router-dom'

export default function Footer() {
  const [loading, setLoading] = useState(true);
  const [companyDetails, setCompanyDetails] = useState([]);
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

  async function fetchCompanyDetails() {
    setLoading(true);
    const token = process.env.REACT_APP_TOKEN;
    const companyDetailsApi = process.env.REACT_APP_COMPANY_DETAILS_API;
    await fetch(companyDetailsApi, {
      headers: { token }
    }).then(res => res.json()).then((res) => {
      setLoading(false);
      setCompanyDetails(res.data);
    });
  }

  useEffect(() => {
    fetchProducts();
    fetchCompanyDetails();
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
          {
            loading ? <div style={{ height: "100px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
              <ReactLoading type='spokes' height={40} width={40} color='green' />
            </div>
              :
              <>
                <p>Reg. Office: {companyDetails[0].address}</p>
                <p>Ph: <a href={`tel:+91 ${companyDetails[0].phone}`}>+91 {companyDetails[0].phone}</a></p>
                <p>Email: <a href={`mailto:${companyDetails[0].email}`}>{companyDetails[0].email}</a></p>
              </>
          }
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
