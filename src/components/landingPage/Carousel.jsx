import React, { useEffect, useState } from 'react'
import '../../css/landingPage/carousel.css'
import { Link } from 'react-router-dom'

export default function Carousel() {
    const [sliderData, setSliderData] = useState([]);
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    async function fetchSlider() {
        // setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const sliderUrl = process.env.REACT_APP_SLIDER_IMAGE_API;
        await fetch(sliderUrl, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            // setLoading(false);
            setSliderData(res.data);
        }).catch((e) => {
            console.log("the error is " + e);
        })
    }
    useEffect(() => {
        fetchSlider();
    }, []);
    return (
        <div className="carouselPage" style={{ overflow: "hidden" }}>
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel" data-aos="zoom-out">
                <div className="carousel-inner">
                    {
                        sliderData.length === 0 ? null :
                            <div className="carousel-item active" style={{ backgroundImage: `url('${imgBaseUrl}/storage/sliderimages/${sliderData[0].image}')`, backgroundSize: "contain" }}>
                            </div>
                    }
                    <div className={`carousel-item ${sliderData.length === 0 ? "active" : null}`} style={{ backgroundImage: "url('assets/landingPage/slider1.png')" }}>
                        <div className="content">
                            <h1>Tex Nora</h1>
                            <p>Welcomes you to our home textile manufacturing company from India! <br /><br />We are a leading manufacturer and exporter of high-quality home textile products, With years of experience in the industry, we have established ourselves as a trusted name in the market.</p>
                            <Link to={"/about-us"}>Read More</Link>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider2.png')" }}>
                        <div className="content">
                            <p>We are a leading manufacturer and exporter of high-quality home textile products.</p>
                            <Link to={"/about-us"}>Read More</Link>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider3.png')" }}>
                        <div className="content">
                            <p>We specialize in manufacturing products such as bed linens, curtains, tablecloths, towels, and much more.</p>
                            <Link to={"/about-us"}>Read More</Link>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider4.png')" }}>
                        <div className="content">
                            <p>As an Indian company, we take pride in our rich cultural heritage and incorporate traditional designs </p>
                            <Link to={"/about-us"}>Read More</Link>
                        </div>
                    </div>
                </div>
                <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev"></button>
                <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next"></button>
            </div>
        </div>
    )
}
