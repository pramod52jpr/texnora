import React from 'react'
import '../../css/aboutUs/ourJourney.css'

export default function OurJourney() {
  return (
    <div className="ourJourney">
      <h1 data-aos="zoom-in">OUR JOURNEY</h1>
      <div className="journeyContainer">
        <div className="journey" style={{overflow:"hidden"}}>
          <div className="content" data-aos="fade-right">
            Our journey began in India with a passion for textiles and a vision to create products that would transform homes. Over the years, we have grown from a small manufacturing unit to a renowned name in the industry. We have expanded our operations, invested in state-of-the-art machinery, and built a team of skilled professionals who share our commitment to excellence. <br /><br />Throughout our journey, we have remained dedicated to our core values of quality, integrity, and sustainability. We have established strong relationships with our customers, suppliers, and partners, fostering a collaborative environment that drives our success. <br /><br />As we continue on our journey, we are constantly exploring new avenues for growth and innovation. We are committed to staying ahead of market trends, understanding the evolving needs of our customers, and adapting our products and processes accordingly.Our journey is driven by a deep-rooted passion for textiles, a relentless pursuit of excellence, and a strong desire to make a positive impact on the homes and lives of people around the world.
          </div>
          <img src="assets/about/journey.png" alt="" data-aos="fade-left" />
        </div>
      </div>
    </div>
  )
}
