import React from 'react'
import ReactLoading from 'react-loading';
import '../../css/products/productsBg.css'

export default function ProductsBg(props) {
    const productsData = props.productsData;
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    return (
        props.loading ? <div style={{ height: "300px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
            <ReactLoading type='spokes' height={50} width={50} color='green' />
        </div>
            : <div className="productsBgPage" style={{overflow:"hidden"}}>
                <h1 data-aos="fade-right">Products</h1>
                <p data-aos="fade-right">{productsData.length} Products</p>
                <div className="productBg" style={{ backgroundImage: "url('../../../assets/products/productsbg.png')" }} data-aos="zoom-out">
                    <img className="logo" src="../../../assets/products/texnora-logo2.png" alt="" />
                    <div className="productsImages">
                        <div className="images">
                            <div className="image img1" style={{ backgroundImage: `url(${productsData[0] ? imgBaseUrl + '/storage/productimages/' + productsData[0].img1 : '../../../assets/landingPage/slider1.png'})` }}></div>
                            <div className="image img2" style={{ backgroundImage: `url(${productsData[1] ? imgBaseUrl + '/storage/productimages/' + productsData[1].img1 : '../../../assets/landingPage/slider2.png'})` }}></div>
                        </div>
                        <div className="images">
                            <div className="image img3" style={{ backgroundImage: `url(${productsData[2] ? imgBaseUrl + '/storage/productimages/' + productsData[2].img1 : '../../../assets/landingPage/slider3.png'})` }}></div>
                            <div className="image img4" style={{ backgroundImage: `url(${productsData[3] ? imgBaseUrl + '/storage/productimages/' + productsData[3].img1 : '../../../assets/landingPage/slider4.png'})` }}></div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
