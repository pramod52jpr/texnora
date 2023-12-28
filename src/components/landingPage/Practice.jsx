import React from 'react'
import '../../css/landingPage/practice.css'

export default function Practice() {
  return (
    <div className="practice" style={{overflow:"hidden"}}>
        <h1 data-aos="zoom-out">PRACTICES FOLLOWED</h1>
        <div className="items">
            <div className="item" data-aos="zoom-in">
                <img src="assets/landingPage/practice1.png" alt="" />
                <p>Using eco-friendly and sustainable materials</p>
            </div>
            <div className="item" data-aos="zoom-in">
                <img src="assets/landingPage/practice2.png" alt="" />
                <p>Implementing ethical manufacturing processes</p>
            </div>
            <div className="item" data-aos="zoom-in">
                <img src="assets/landingPage/practice3.png" alt="" />
                <p>Adhering to quality control standards</p>
            </div>
            <div className="item" data-aos="zoom-in">
                <img src="assets/landingPage/practice4.png" alt="" />
                <p>Emphasizing worker safety and fair labor practices</p>
            </div>
            <div className="item" data-aos="zoom-in">
                <img src="assets/landingPage/practice5.png" alt="" />
                <p>Investing in research and development for continuous improvement</p>
            </div>
            <div className="item" data-aos="zoom-in">
                <img src="assets/landingPage/practice6.png" alt="" />
                <p>Collaborating with suppliers and partners to streamline the supply chain</p>
            </div>
        </div>
    </div>
  )
}
