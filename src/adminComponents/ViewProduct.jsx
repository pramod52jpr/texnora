import React from 'react'
import '../adminCss/viewProduct.css'

export default function ViewProduct(props) {
    const viewData = props.viewData;
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    return (
        <div className="viewProduct">
            <div className="cancel">
                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <div className="productImages">
                {
                    viewData.image ? <div className="image" style={{ backgroundImage: `url('${imgBaseUrl}/storage/customimages/${viewData.image}')` }}></div>
                        : <div id="carouselExampleIndicators" className="carousel slide">
                            <div className="carousel-inner">
                                <div className="carousel-item active" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${viewData.img1}')` }}>
                                </div>
                                <div className="carousel-item" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${viewData.img2}')` }}>
                                </div>
                                <div className="carousel-item" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${viewData.img3}')` }}>
                                </div>
                                <div className="carousel-item" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${viewData.img4}')` }}>
                                </div>
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <div className="prev">
                                    <i className="fa-solid fa-caret-left"></i>
                                </div>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <div className="next">
                                    <i className="fa-solid fa-caret-right"></i>
                                </div>
                            </button>
                        </div>
                }
            </div>
            <div className="content">
                {
                    viewData.pro_no ? <>
                        <div className="detailLabel">Id</div>
                        <div className="detailValue">{viewData.pro_no}</div>
                    </> : null
                }
                <div className="detailLabel">Name</div>
                <div className="detailValue">{viewData.name}</div>
                <div className="detailLabel">Description</div>
                <div className="detailValue">{viewData.description}</div>
                <div className="detailLabel">Material</div>
                <div className="detailValue">{viewData.material}</div>
                <div className="detailLabel">Size</div>
                <div className="detailValue">{viewData.size}</div>
                <div className="detailLabel">Color</div>
                <div className="detailValue">{viewData.color}</div>
            </div>
        </div>
    )
}
