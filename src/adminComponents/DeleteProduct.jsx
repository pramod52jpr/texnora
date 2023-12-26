import React, { useState } from 'react'
import '../adminCss/deleteProduct.css'
import ReactLoading from 'react-loading';

export default function DeleteProduct(props) {
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
            alert("Product deleted successfully");
            props.closeModal();
            props.fetchProducts();
        }).catch(() => {
            setDeleteLoading(false);
            alert("Product not deleted because of some error");
        })
    }
    return (
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
    )
}
