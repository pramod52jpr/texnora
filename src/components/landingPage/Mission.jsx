import React from 'react'
import '../../css/landingPage/mission.css'

export default function Mission() {
    return (
        <div className="mission" style={{overflow:"hidden"}}>
            <div className="image" style={{ backgroundImage: "url('assets/landingPage/mission.png')" }} data-aos="fade-right"></div>
            <div className="content" data-aos="fade-left">
                <h1>Mission</h1>
                <p>Our mission is to provide high-quality home textile products that enhance the comfort and beauty of homes across the globe. We strive to exceed customer expectations by delivering innovative designs, exceptional craftsmanship, and sustainable manufacturing practices.</p>
            </div>
        </div>
    )
}
