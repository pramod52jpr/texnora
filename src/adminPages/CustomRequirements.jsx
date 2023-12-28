import React, { useEffect, useState } from 'react'
import '../adminCss/customRequirement.css'
import Header from '../adminComponents/Header'
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import ViewProduct from '../adminComponents/ViewProduct';

export default function CustomRequirements() {
    const [loading, setLoading] = useState(false);
    const [allRequirementsData, setAllRequirementsData] = useState([]);
    const [allProductData, setAllProductData] = useState([]);
    const [showViewExistingProductModal, setShowViewExistingProductModal] = useState(false);
    const [showViewRecommendedProductModal, setshowViewRecommendedProductModal] = useState(false);
    const [viewExistingProduct, setViewExistingProduct] = useState();
    const [viewRecommendedProduct, setViewRecommendedProduct] = useState();
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
    };

    function closeModal() {
        setShowViewExistingProductModal(false);
        setshowViewRecommendedProductModal(false);
    }

    async function fetchRequirementData() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const customApi = process.env.REACT_APP_CUSTOM_API;
        await fetch(customApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            fetchProducts();
            setAllRequirementsData(res.data.reverse());
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
    }

    async function fetchProducts() {
        const token = process.env.REACT_APP_TOKEN;
        const apiUrl = process.env.REACT_APP_PRODUCT_API;
        await fetch(apiUrl, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setAllProductData(res.data);
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
    }

    useEffect(() => {
        fetchRequirementData();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showViewExistingProductModal} style={modalStyle}>
                <ViewProduct closeModal={closeModal} viewData={viewExistingProduct} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showViewRecommendedProductModal} style={modalStyle}>
                <ViewProduct closeModal={closeModal} viewData={viewRecommendedProduct} />
            </ReactModal>
            <Header title={"Custom Requirements"} />
            <div className="customRequirements">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            {/* <th>Image</th>
                            <th>Name</th>
                            <th>Desc.</th>
                            <th>Material</th>
                            <th>Size</th>
                            <th>Color</th> */}
                            <th>Customer Name</th>
                            {/* <th>Email</th> */}
                            <th>Phone</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr align="center"><td style={{ height: "300px" }} colSpan={500}>
                                <ReactLoading type='spokes' height={50} width={50} color='green' />
                            </td></tr>
                                : allRequirementsData.map(element => <tr key={element.id}>
                                    <td>{element.date}</td>
                                    {/* <td><div className='image' style={{ backgroundImage: `url('${imgBaseUrl}/storage/customimages/${element.image}')` }}></div></td>
                                    <td>{element.name}</td>
                                    <td>{element.description}</td>
                                    <td>{element.material}</td>
                                    <td>{element.size}</td>
                                    <td>{element.color}</td> */}
                                    <td>{element.customer_name}</td>
                                    {/* <td>{element.customer_email}</td> */}
                                    <td>{element.customer_phone}</td>
                                    <td>
                                        <div className="action">
                                            <button className='viewRecommend' title='View Recommended Product' onClick={() => {
                                                setViewRecommendedProduct(element);
                                                setshowViewRecommendedProductModal(true);
                                            }}><i className="fa-solid fa-eye"></i></button>
                                            <button className='view' title='View Existing Product' onClick={() => {
                                                const productData = allProductData.filter(ele => ele.id === element.product)[0];
                                                setViewExistingProduct(productData);
                                                setShowViewExistingProductModal(true);
                                            }}><i className="fa-solid fa-eye"></i></button>
                                        </div>
                                    </td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}
