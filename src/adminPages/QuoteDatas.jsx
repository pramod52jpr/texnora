import React, { useEffect, useState } from 'react'
import '../adminCss/quoteDatas.css'
import Header from '../adminComponents/Header'
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import ViewProduct from '../adminComponents/ViewProduct';

export default function QuoteDatas() {
    const [loading, setLoading] = useState(false);
    const [allQuotesData, setAllQuotesData] = useState([]);
    const [allProductData, setAllProductData] = useState([]);
    const [showViewModal, setShowViewModal] = useState(false);
    const [viewData, setViewData] = useState();
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
        fetchQuoteData();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showViewModal} style={modalStyle}>
                <ViewProduct closeModal={closeModal} viewData={viewData} />
            </ReactModal>
            <Header title={"Quotes Data"} />
            <div className="quoteDatas">
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
                                : allQuotesData.map(element => <tr key={element.id}>
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
        </>
    )
}
