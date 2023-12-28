import React from 'react'
import '../../css/landingPage/process.css'

export default function Process() {
    return (
        <div className="process" style={{overflow:"hidden"}}>
            <h1 data-aos="zoom-out">OUR MANUFACTURING PROCESS</h1>
            <div id="carouselExample" className="carousel slide" data-aos="zoom-out">
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1">Design</button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="1" aria-label="Slide 2">Material</button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="2" aria-label="Slide 3">Cutting & Sewing</button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="3" aria-label="Slide 4">Printing</button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="4" aria-label="Slide 5">Quality Control</button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="5" aria-label="Slide 6">Packaging</button>
                    <button type="button" data-bs-target="#carouselExample" data-bs-slide-to="6" aria-label="Slide 7">Distribution</button>
                </div>
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <div className="content">
                            <h2>Design and Development</h2>
                            <p>The first step in home textile manufacturing is the design and development phase. This involves creating patterns, selecting fabrics, and determining the specifications for the desired products.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="content">
                            <h2>Sourcing of Materials</h2>
                            <p>Once the design is finalized, the next step is to source the required materials. This includes procuring fabrics, threads, dyes, and other necessary components from suppliers.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="content">
                            <h2>Cutting and Sewing</h2>
                            <p>After the materials are sourced, the fabric is cut into the required shapes and sizes according to the design specifications. The cut pieces are then sewn together using sewing machines or other appropriate techniques.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="content">
                            <h2>Printing and Embroidery</h2>
                            <p>If the design requires printing or embroidery, this step is carried out after the cutting and sewing process. Printing can be done using various techniques, such as screen printing or digital printing, while embroidery is typically done using specialized machines.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="content">
                            <h2>Quality Control</h2>
                            <p>Throughout the manufacturing process, quality control checks are conducted to ensure that the products meet the required standards. This includes inspecting the materials, checking the stitching, and verifying the overall quality of the finished products.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="content">
                            <h2>Finishing and Packaging</h2>
                            <p>Once the products pass the quality control checks, they undergo finishing processes such as ironing, folding, and packaging. The finished products are then packed and prepared for shipment or distribution.</p>
                        </div>
                    </div>
                    <div className="carousel-item">
                        <div className="content">
                            <h2>Distribution and Sales</h2>
                            <p>The final step in the home textile manufacturing process is the distribution and sales of the products. They are either sold directly to consumers through retail channels or supplied to wholesalers and retailers for further distribution.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
