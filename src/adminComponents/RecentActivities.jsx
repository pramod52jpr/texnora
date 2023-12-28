import React, { useEffect, useState } from 'react'
import '../adminCss/recentActivities.css'
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import ViewProduct from './ViewProduct';

export default function RecentActivities() {
    const [loading, setLoading] = useState(false);
    const [allRequirementsData, setAllRequirementsData] = useState([]);
    const [allProductData, setAllProductData] = useState([]);
    const [showViewExistingProductModal, setShowViewExistingProductModal] = useState(false);
    const [showViewRecommendedProductModal, setshowViewRecommendedProductModal] = useState(false);
    const [viewExistingProduct, setViewExistingProduct] = useState();
    const [viewRecommendedProduct, setViewRecommendedProduct] = useState();

    const [allQuotesData, setAllQuotesData] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewData, setViewData] = useState();
    // const imgBaseUrl = process.env.REACT_APP_BASE_URL;
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
        setShowViewModal(false);
    }

    async function fetchQuoteData() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const quoteApi = process.env.REACT_APP_QUOTE_API;
        await fetch(quoteApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            fetchProducts();
            setAllQuotesData(res.data.reverse());
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
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
        fetchQuoteData();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showViewExistingProductModal} style={modalStyle}>
                <ViewProduct closeModal={closeModal} viewData={viewExistingProduct} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showViewRecommendedProductModal} style={modalStyle}>
                <ViewProduct closeModal={closeModal} viewData={viewRecommendedProduct} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showViewModal} style={modalStyle}>
                <ViewProduct closeModal={closeModal} viewData={viewData} />
            </ReactModal>
            <div className="recentActivities">
                <h1 className='title'>Recent Activities</h1>
                <div className="dashboardCustomRequirements">
                    <h2>Custom Requirments</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Customer Name</th>
                                <th>Phone</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <tr align="center"><td style={{ height: "300px" }} colSpan={500}>
                                    <ReactLoading type='spokes' height={50} width={50} color='green' />
                                </td></tr>
                                    : allRequirementsData.reverse().slice(0, allRequirementsData.length <= 3 ? allRequirementsData.length : 3).map(element => <tr key={element.id}>
                                        <td>{element.date}</td>
                                        <td>{element.customer_name}</td>
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
                <div className="dashboardQuoteDatas">
                    <h2>Quote Request</h2>
                    <table>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Address</th>
                                <th>Comment</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                loading ? <tr align="center"><td style={{ height: "300px" }} colSpan={500}>
                                    <ReactLoading type='spokes' height={50} width={50} color='green' />
                                </td></tr>
                                    : allQuotesData.reverse().slice(0, allQuotesData.length > 3 ? 3 : allQuotesData.length).map(element => <tr key={element.id}>
                                        <td>{element.date}</td>
                                        <td>{element.name}</td>
                                        <td>{element.email}</td>
                                        <td>{element.phone}</td>
                                        <td>{element.address}</td>
                                        <td>{element.comment}</td>
                                        <td>
                                            <div className="action" title='View Product'>
                                                <button className='view' onClick={() => {
                                                    const productData = allProductData.filter(ele => ele.id === element.product)[0];
                                                    setViewData(productData);
                                                    setShowViewModal(true);
                                                }}><i className="fa-solid fa-eye"></i></button>
                                            </div>
                                        </td>
                                    </tr>
                                    )
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
