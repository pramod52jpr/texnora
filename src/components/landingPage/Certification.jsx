import React from 'react'
import '../../css/landingPage/certification.css'

export default function Certification() {
    return (
        <div className="certification" style={{overflow:"hidden"}}>
            <h1 data-aos="zoom-out">OUR CERTIFICATIONS</h1>
            <marquee direction="left" loop="unlimited" scrollamount="10" data-aos="zoom-in">
                    <img src="assets/landingPage/certification1.png" alt="" />
                    <img src="assets/landingPage/certification2.png" alt="" />
                    <img src="assets/landingPage/certification3.png" alt="" />
                    <img src="assets/landingPage/certification4.png" alt="" />
                    <img src="assets/landingPage/certification5.png" alt="" />
            </marquee>
        </div>
    )
}
