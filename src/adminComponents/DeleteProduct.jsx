import React, { useState } from 'react'
import '../adminCss/deleteProduct.css'
import ReactLoading from 'react-loading';
import SuccessModal from '../components/SuccessModal';
import FailureModal from '../components/FailureModal';

export default function DeleteProduct(props) {
    const [done, setDone] = useState(false);
    const [fail, setFail] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteData = props.deleteData;
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;

    async function ondelete() {
        setDeleteLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const apiUrl = process.env.REACT_APP_PRODUCT_API;
        await fetch(apiUrl, {
            method: "delete",
            headers: {
                token,
                "id": deleteData.id,
            }
        }).then(res => res.json()).then((res) => {
            setDeleteLoading(false);
            setDone(true);
            props.fetchProducts();
        }).catch(() => {
            setDeleteLoading(false);
            setFail(true);
        })
    }
    return (
        <>
            {
                done ?
                    <SuccessModal h1={"Success"} p={"Product Deleted Successfully"} closeModal={props.closeModal} />
                    : fail ?
                        <FailureModal h1={"Sorry !"} p={"There is some server issue. Please try again later."} closeModal={props.closeModal} />
                        :
                        <div className="deleteProduct">
                            <div className="item">
                                <div className="image" style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${deleteData.img1}')` }}></div>
                                <hr width="100%" />
                                <h2>{deleteData.pro_no}</h2>
                            </div>
                            <div className="content">
                                <p>Are you Sure you want to delete?</p>
                                <div className="btns">
                                    <button className='delete' onClick={ondelete}>{deleteLoading ?
                                        <div align="center" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                                            <ReactLoading type='spin' color='white' width={"25%"} height={"auto"} />
                                        </div>
                                        : "Delete"}</button>
                                    <button className='cancel' onClick={props.closeModal}>Cancel</button>
                                </div>
                            </div>
                        </div>
            }
        </>
    )
}
