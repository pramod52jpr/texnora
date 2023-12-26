import React from 'react'
import '../../css/landingPage/carousel2.css'

export default function Carousel2() {
    return (
        <div className="carousel2Page">
            <div id="carouselExampleIndicators" className="carousel slide carousel-fade" data-bs-ride="carousel">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
                    <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
                </div>
                <div className="carousel-inner carousel2">
                    <div className="carousel-item active" style={{ backgroundImage: "url('assets/landingPage/slider5.png')" }}>
                        <div className="content">
                            <h1>CURTAINS</h1>
                            <p>Elevate your home's allure with our exquisite curtains, where every thread weaves a story of comfort, sophistication, and unparalleled craftsmanship</p>
                            <a href="#">EXPLORE COLLECTION</a>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider6.png')" }}>
                        <div className="content">
                            <h1>BED LINEN</h1>
                            <p>where dreams meet indulgence, and every night is a promise of sublime comfort.</p>
                            <a href="#">EXPLORE COLLECTION</a>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider7.png')" }}>
                        <div className="content">
                            <h1>TABLE LINEN</h1>
                            <p>Dine in style, draped in elegance</p>
                            <a href="#">EXPLORE COLLECTION</a>
                        </div>
                    </div>
                    <div className="carousel-item" style={{ backgroundImage: "url('assets/landingPage/slider8.png')" }}>
                        <div className="content">
                            <h1>KITCHEN LINEN</h1>
                            <p>Cook with Confidence, Protected by our Linens.</p>
                            <a href="#">EXPLORE COLLECTION</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
