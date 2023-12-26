import React, { useState } from 'react'
import '../../css/products/product.css'
import ReactLoading from 'react-loading';
import { useNavigate } from 'react-router-dom';

export default function Product(props) {
    const navigate = useNavigate();
    const [hover, setHover] = useState("");
    const productsData = props.productsData;
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    return (
        <div className="productPage">
            <div className="items">
                {
                    props.loading?<div style={{height:"300px",width:"100%",display:"flex",justifyContent:"center",alignItems:"center"}}>
                        <ReactLoading type='spokes' height={50} width={50} color='green' />
                    </div>
                    :productsData.map(element => <div key={element.id} className="item" onClick={() => navigate(`/product-details/${element.cid}/${element.id}`)} onMouseOver={() => setHover(`hover${element.id}`)} onMouseLeave={() => setHover("")}>
                        <div className="image" style={{ backgroundImage: hover===`hover${element.id}` ? `url('${imgBaseUrl}/storage/productimages/${element.img1}')` : `url('${imgBaseUrl}/storage/productimages/${element.img2}')` }}></div>
                        <div>
                            <h2>{element.pro_no}</h2>
                            {/* {
                                hover===`hover${element.id}` ?
                                    <button onClick={(e) => {
                                        e.stopPropagation();
                                        console.log("printed butter");
                                    }}>Get Quote</button> : ""
                            } */}
                        </div>
                    </div>
                    )
                }
            </div>
            <div className="letsTalk">
                <div className="content">
                    <h1>Lets Talk</h1>
                    <button>contact us</button>
                </div>
                <hr />
            </div>
        </div>
    )
}
