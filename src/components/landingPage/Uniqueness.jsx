import React from 'react'
import '../../css/landingPage/uniqueness.css'

export default function Uniqueness() {
    return (
        <div className="uniqueness" style={{overflow:"hidden"}}>
            <div className="content" data-aos="fade-right">
                <h1>Uniqueness</h1>
                <p>Uniqueness is an important aspect of home textile manufacturing. Manufacturers strive to create products that stand out from the competition by offering distinctive designs, high-quality materials, and innovative features. This uniqueness helps to attract customers and build brand loyalty.</p>
            </div>
            <div className="image" style={{ backgroundImage: "url('assets/landingPage/uniqueness.png')" }} data-aos="fade-left"></div>
        </div>
    )
}
