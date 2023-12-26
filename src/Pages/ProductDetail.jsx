import React, { useEffect, useState } from 'react'
import '../css/productDetails.css'
import ReactLoading from 'react-loading';
import { useNavigate, useParams } from 'react-router-dom';
import ReactModal from 'react-modal';
import CustomPopUp from './CustomPopUp';
import GetQuote from './GetQuote';

export default function ProductDetail() {
    const [showCustomModal, setShowCustomModal] = useState(false);
    const [showGetQuoteModal, setShowGetQuoteModal] = useState(false);
    const params = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [hover, setHover] = useState(false);
    const [productsData, setProductsData] = useState([]);
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    const modalStyle = {
        content: {
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
        }
    }

    function closeModal() {
        setShowCustomModal(false);
        setShowGetQuoteModal(false);
    }

    async function fetchProducts() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const proApi = process.env.REACT_APP_PRODUCT_API;
        await fetch(proApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setProductsData(res.data.filter(e => e.cid === parseInt(params.cid)));
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
    }
    useEffect(() => {
        fetchProducts();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showCustomModal} style={modalStyle}>
                <CustomPopUp pid={params.pid} closeModal={closeModal} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showGetQuoteModal} style={modalStyle}>
                <GetQuote pid={params.pid} closeModal={closeModal} />
            </ReactModal>
            {
                loading ? <div style={{ height: "300px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                    <ReactLoading type='spokes' height={50} width={50} color='green' />
                </div>
                    : productsData.map((element, index) => <div key={element.id} className="productDetailPage" style={{ display: element.id === parseInt(params.pid) ? "flex" : "none" }}>
                        <div className="productImages">
                            <div id={`carouselExampleIndicators${index}`} className="carousel slide">
                                {
                                    showCustomModal || showGetQuoteModal ? null :
                                        <div className="carousel-indicators">
                                            <button type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img1}')` }}></button>
                                            <button type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide-to="1" aria-label="Slide 2" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img2}')` }}></button>
                                            <button type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide-to="2" aria-label="Slide 3" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img3}')` }}></button>
                                            <button type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide-to="3" aria-label="Slide 4" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img4}')` }}></button>
                                        </div>
                                }
                                <div className="carousel-inner">
                                    <div className="carousel-item active" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img1}')` }}>
                                    </div>
                                    <div className="carousel-item" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img2}')` }}>
                                    </div>
                                    <div className="carousel-item" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img3}')` }}>
                                    </div>
                                    <div className="carousel-item" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img4}')` }}>
                                    </div>
                                </div>
                                {
                                    showCustomModal || showGetQuoteModal ? null :
                                        <>
                                            <button className="carousel-control-prev" type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide="prev">
                                                <div className="prev">
                                                    <i className="fa-solid fa-caret-left"></i>
                                                </div>
                                            </button>
                                            <button className="carousel-control-next" type="button" data-bs-target={`#carouselExampleIndicators${index}`} data-bs-slide="next">
                                                <div className="next">
                                                    <i className="fa-solid fa-caret-right"></i>
                                                </div>
                                            </button>
                                        </>
                                }
                            </div>
                        </div>
                        <div className="productDetail">
                            <div className="name">
                                <button onClick={() => {
                                    if (index !== 0) {
                                        const prevProductId = productsData.at(index - 1).id;
                                        navigate(`/product-details/${params.cid}/${prevProductId}`)
                                    }
                                }}><i className="fa-solid fa-arrow-left"></i></button>
                                <h1>{element.pro_no}</h1>
                                <button onClick={() => {
                                    if (index !== productsData.length - 1) {
                                        const nextProductId = productsData.at(index + 1).id;
                                        navigate(`/product-details/${params.cid}/${nextProductId}`)
                                    }
                                }}><i className="fa-solid fa-arrow-right"></i></button>
                            </div>
                            <div className="prosrno">Showing {index + 1} / {productsData.length} products</div>
                            <hr />
                            <div className="quote">
                                <button className='custom' onClick={() => setShowCustomModal(true)}><i className="fa-regular fa-bookmark"></i>Custom</button>
                                <button className='getQuote' onClick={() => setShowGetQuoteModal(true)}><i className="fa-regular fa-floppy-disk"></i>Get Quote</button>
                            </div>
                            <div className="enquiry">
                                <div className="content">
                                    <p>Send an enquiry to know more details about your favourites</p>
                                    <button>View details {">"}</button>
                                </div>
                                <img src="../../../assets/productDetails/enquiry.png" alt="" />
                            </div>
                            <hr />
                            <div className="details">
                                <div className="content">
                                    <h2>Name</h2>
                                    <p>{element.name}</p>
                                </div>
                                <div className="content">
                                    <h2>Description</h2>
                                    <p>{element.description}</p>
                                </div>
                                <div className="content">
                                    <h2>Material</h2>
                                    <p>{element.material}</p>
                                </div>
                                <div className="content">
                                    <h2>Size</h2>
                                    <p>{element.size}</p>
                                </div>
                                <div className="content">
                                    <h2>Color</h2>
                                    <p>{element.color}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    )
            }

            <div className="viewmore">
                <h1>View more products</h1>
                <div className="items">
                    <div className="item" onClick={() => navigate("/product-details")} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className="image" style={{ backgroundImage: hover ? "url('assets/landingPage/slider5.png')" : "url('assets/landingPage/slider6.png')" }}></div>
                        <div>
                            <h2>ID - TN-EC (43)</h2>
                            {
                                hover ?
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("printed butter");
                                    }}>Get Quote</button> : ""
                            }
                        </div>
                    </div>
                    <div className="item" onClick={() => navigate("/product-details")} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className="image" style={{ backgroundImage: hover ? "url('assets/landingPage/slider5.png')" : "url('assets/landingPage/slider6.png')" }}></div>
                        <div>
                            <h2>ID - TN-EC (43)</h2>
                            {
                                hover ?
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("printed butter");
                                    }}>Get Quote</button> : ""
                            }
                        </div>
                    </div>
                    <div className="item" onClick={() => navigate("/product-details")} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className="image" style={{ backgroundImage: hover ? "url('assets/landingPage/slider5.png')" : "url('assets/landingPage/slider6.png')" }}></div>
                        <div>
                            <h2>ID - TN-EC (43)</h2>
                            {
                                hover ?
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("printed butter");
                                    }}>Get Quote</button> : ""
                            }
                        </div>
                    </div>
                    <div className="item" onClick={() => navigate("/product-details")} onMouseOver={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                        <div className="image" style={{ backgroundImage: hover ? "url('assets/landingPage/slider5.png')" : "url('assets/landingPage/slider6.png')" }}></div>
                        <div>
                            <h2>ID - TN-EC (43)</h2>
                            {
                                hover ?
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("printed butter");
                                    }}>Get Quote</button> : ""
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="exploreAll">
                <button>Explore all products</button>
            </div>
        </>
    )
}
