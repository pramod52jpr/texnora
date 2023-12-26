import React from 'react'
import '../../css/landingPage/manufactureDesigning.css'

export default function ManufactureDesigning() {
  return (
    <>
            <div className="manufactureDesigning">
                <div className="content">
                    <h1>Home Textile Manufacturing</h1>
                    <p>Home textile manufacturing refers to the process of producing various textile products that are used in homes, such as bedding, curtains, towels, and upholstery. This industry involves designing, producing, and distributing these textile products to meet the needs and preferences of consumers.</p>
                </div>
                <div className="image" style={{ backgroundImage: "url('assets/landingPage/manufacturing.png')" }}></div>
            </div>
            <div className="manufactureDesigning designing">
                <div className="image" style={{ backgroundImage: "url('assets/landingPage/designing.png')" }}></div>
                <div className="content">
                    <h1>Designing</h1>
                    <p>In home textile manufacturing, designers play a vital role in crafting visually appealing products by focusing on patterns, colors, and textures aligned with current home decor trends. They prioritize both aesthetics and functionality to meet the practical needs and comfort of end-users.</p>
                </div>
            </div>
        </>
  )
}
