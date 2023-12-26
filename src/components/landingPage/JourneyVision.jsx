import React from 'react'
import '../../css/landingPage/journeyVision.css'

export default function JourneyVision() {
    return (
        <>
            <div className="journeyVision journey">
                <div className="image" style={{ backgroundImage: "url('assets/landingPage/journey.png')" }}></div>
                <div className="content">
                    <h1>Journey</h1>
                    <p>Starting in India with a textile passion, we've grown into an industry leader. Our journey involves expanding operations, investing in top-notch machinery, and fostering a skilled team dedicated to excellence. Upholding core values of quality, integrity, and sustainability, we've built strong relationships, creating a collaborative environment for our success.</p>
                </div>
            </div>
            <div className="journeyVision">
                <div className="content">
                    <h1>Vision</h1>
                    <p>Our vision is to be a global leader in home textile manufacturing, renowned for quality, customer satisfaction, and ethical practices. By prioritizing innovation and technology, we aim to make a lasting impact on our customers' homes and lives</p>
                </div>
                <div className="image" style={{ backgroundImage: "url('assets/landingPage/vision.png')" }}></div>
            </div>
        </>
    )
}
