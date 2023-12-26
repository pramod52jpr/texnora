import React from 'react'
import '../../css/landingPage/commitment.css'

export default function Commitment() {
  return (
    <div className="commitments" style={{backgroundImage:"url('assets/landingPage/commitment.png')"}}>
        <h1>OUR COMMITMENTS</h1>
        <div className="items">
            <div className="item">
                <h2>Sustainability</h2>
                <p>Committed to sustainability, we prioritize eco-friendly practices, from sourcing materials to reducing our carbon footprint. Our goal is a greener future through sustainable manufacturing and environmentally friendly products</p>
            </div>
            <div className="item">
                <h2>Quality</h2>
                <p>We are a home textile manufacturing company committed to delivering top-quality products. Our rigorous quality control, from raw material selection to manufacturing and final inspection, ensures that each item meets the highest standards. Quality is our priority at every step of the process.</p>
            </div>
            <div className="item">
                <h2>Flexibility</h2>
                <p>We acknowledge the uniqueness of each customer's preferences and needs. Committed to flexibility, we offer customized solutions in designs, sizes, and materials. Our dedicated team collaborates closely with clients to ensure satisfaction.</p>
            </div>
            <div className="item">
                <h2>Delivery</h2>
                <p>Timely delivery is integral to our customer satisfaction commitment. With efficient production processes and a streamlined supply chain, we ensure on-time order delivery. Our dedicated logistics team meticulously coordinates shipments and monitors deliveries, minimizing delays or disruptions.</p>
            </div>
        </div>
    </div>
  )
}
