import React from 'react'
import '../../css/landingPage/carousel.css'

export default function Carousel() {
    return (
        <div className="carouselPage">
            <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
                <div className="carousel-inner">
                    <div className="carousel-item active" style={{ backgroundImage: "url('assets/landingPage/slider1.png')" }}>
                        <div className="content">
                            <h1>Tex Nora</h1>
                            <p>Welcomes you to our home textile manufacturing company from India! <br /><br />We are a leading manufacturer and exporter of high-quality home textile products, With years of experience in the industry, we have established ourselves as a trusted name in the market.</p>
                            <a href="#">Read More</a>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider2.png')" }}>
                        <div className="content">
                            <p>We are a leading manufacturer and exporter of high-quality home textile products.</p>
                            <a href="#">Read More</a>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider3.png')" }}>
                        <div className="content">
                            <p>We specialize in manufacturing products such as bed linens, curtains, tablecloths, towels, and much more.</p>
                            <a href="#">Read More</a>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider4.png')" }}>
                        <div className="content">
                            <p>As an Indian company, we take pride in our rich cultural heritage and incorporate traditional designs </p>
                            <a href="#">Read More</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
