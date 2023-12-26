import React, { useEffect, useState } from 'react'
import Header from '../adminComponents/Header'
import '../adminCss/adminProducts.css'
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import AddProduct from '../adminComponents/AddProduct';
import UpdateProduct from '../adminComponents/UpdateProduct';
import DeleteProduct from '../adminComponents/DeleteProduct';
import ViewProduct from '../adminComponents/ViewProduct';

export default function AdminProducts() {
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState("");
    const [selectedCategoryData, setSelectedCategoryData] = useState([]);
    const [showAddProductModal, setShowAddProductModal] = useState(false);
    const [showUpdateProductModal, setShowUpdateProductModal] = useState(false);
    const [showDeleteProductModal, setShowDeleteProductModal] = useState(false);
    const [showViewProductModal, setShowViewProductModal] = useState(false);
    const [allProductData, setAllProductData] = useState([]);
    const [allCategoryData, setAllCategoryData] = useState([]);
    const [updateData, setUpdateData] = useState();
    const [deleteData, setDeleteData] = useState();
    const [viewData, setViewData] = useState();
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
        setShowAddProductModal(false);
        setShowUpdateProductModal(false);
        setShowDeleteProductModal(false);
        setShowViewProductModal(false);
    }

    function onSearch(e){
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            setSelectedCategoryData(allProductData);
        } else {
            setSelectedCategoryData(allProductData.filter(ele => ele.name.toLowerCase().includes(e.target.value.toLowerCase()) || ele.pro_no.toLowerCase().includes(e.target.value.toLowerCase())));
        }
    }

    function onChangeCategory(e) {
        if (e.target.value.length === 0) {
            setSelectedCategoryData(allProductData);
        } else {
            setSelectedCategoryData(allProductData.filter(ele => ele.cid === parseInt(e.target.value)));
        }
    }

    async function fetchProducts() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const apiUrl = process.env.REACT_APP_PRODUCT_API;
        await fetch(apiUrl, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            fetchCategories();
            setAllProductData(res.data);
            setSelectedCategoryData(res.data);
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
    }
    async function fetchCategories() {
        const token = process.env.REACT_APP_TOKEN;
        const catApi = process.env.REACT_APP_CAT_API;
        await fetch(catApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setAllCategoryData(res.data);
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
            <ReactModal ariaHideApp={false} isOpen={showAddProductModal} style={modalStyle}>
                <AddProduct closeModal={closeModal} allCategoryData={allCategoryData} fetchProducts={fetchProducts} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showUpdateProductModal} style={modalStyle}>
                <UpdateProduct closeModal={closeModal} allCategoryData={allCategoryData} fetchProducts={fetchProducts} updateData={updateData} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showDeleteProductModal} style={modalStyle}>
                <DeleteProduct closeModal={closeModal} fetchProducts={fetchProducts} deleteData={deleteData} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showViewProductModal} style={modalStyle}>
                <ViewProduct closeModal={closeModal} allCategoryData={allCategoryData} viewData={viewData} />
            </ReactModal>
            <Header title={"All Products"} />
            <div className="adminProducts">
                <div className="catDropdown">
                    <select name="" id="" defaultValue={""} onChange={onChangeCategory}>
                        <option value="">All</option>
                        {
                            allCategoryData.map(element => <option key={element.id} value={element.id}>{element.name}</option>)
                        }
                    </select>
                </div>
                <div className="topOptions">
                    <button onClick={() => setShowAddProductModal(true)}><i className="fa-solid fa-circle-plus"></i></button>
                    <input type="search" value={search} onChange={onSearch} placeholder='Search' />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Category</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr align="center"><td style={{ height: "300px" }} colSpan={500}>
                                <ReactLoading type='spokes' height={50} width={50} color='green' />
                            </td></tr>
                                : selectedCategoryData.map(element => <tr key={element.id}>
                                    <td>{element.name}</td>
                                    <td><div className='image' style={{ backgroundImage: `url('${imgBaseUrl}/storage/productimages/${element.img1}')` }}></div></td>
                                    <td>{allCategoryData.filter(e => e.id === element.cid)[0].name}</td>
                                    <td>
                                        <div className="action">
                                            <button className='edit' onClick={() => {
                                                setUpdateData(element);
                                                setShowUpdateProductModal(true);
                                            }}><i className="fa-solid fa-pen"></i></button>
                                            <button className='delete' onClick={() => {
                                                setDeleteData(element);
                                                setShowDeleteProductModal(true);
                                            }}><i className="fa-solid fa-trash"></i></button>
                                            <button className='view' onClick={() => {
                                                setViewData(element);
                                                setShowViewProductModal(true);
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
