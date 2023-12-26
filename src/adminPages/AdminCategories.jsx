import React, { useEffect, useState } from 'react'
import Header from '../adminComponents/Header'
import '../adminCss/adminCategories.css';
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import AddCategory from '../adminComponents/AddCategory';
import UpdateCategory from '../adminComponents/UpdateCategory';
import DeleteCategory from '../adminComponents/DeleteCategory';

export default function AdminCategories() {
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [searchedData, setSearchedData] = useState([]);
    const [showAddCatModal, setShowAddCatModal] = useState(false);
    const [showUpdateCatModal, setShowUpdateCatModal] = useState(false);
    const [showDeleteCatModal, setShowDeleteCatModal] = useState(false);
    const [allCategoryData, setAllCategoryData] = useState([]);
    const [updateData, setUpdateData] = useState();
    const [deleteData, setDeleteData] = useState();
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
        setShowAddCatModal(false);
        setShowUpdateCatModal(false);
        setShowDeleteCatModal(false);
    }

    function onSearch(e){
        setSearch(e.target.value);
        if (e.target.value.length === 0) {
            setSearchedData(allCategoryData);
        } else {
            setSearchedData(allCategoryData.filter(ele => ele.name.toLowerCase().includes(e.target.value.toLowerCase())));
        }
    }

    async function fetchCategories() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const apiUrl = process.env.REACT_APP_CAT_API;
        await fetch(apiUrl, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setAllCategoryData(res.data);
            setSearchedData(res.data);
        }).catch((e) => {
            console.log("the error is " + e);
        })
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showAddCatModal} style={modalStyle}>
                <AddCategory closeModal={closeModal} fetchCategories={fetchCategories} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showUpdateCatModal} style={modalStyle}>
                <UpdateCategory closeModal={closeModal} fetchCategories={fetchCategories} updateData={updateData} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showDeleteCatModal} style={modalStyle}>
                <DeleteCategory closeModal={closeModal} fetchCategories={fetchCategories} deleteData={deleteData} />
            </ReactModal>
            <Header title={"All Categories"} />
            <div className="adminCategories">
                <div className="topOptions">
                    <button onClick={() => setShowAddCatModal(true)}><i className="fa-solid fa-circle-plus"></i></button>
                    <input type="search" value={search} onChange={onSearch} placeholder='Search' />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Image</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr align="center"><td style={{ height: "300px" }} colSpan={500}>
                                <ReactLoading type='spokes' height={50} width={50} color='green' />
                            </td></tr>
                                : searchedData.map(element => <tr key={element.id}>
                                    <td>{element.name}</td>
                                    <td><div className='image' style={{ backgroundImage: `url('${imgBaseUrl}/storage/categoryimages/${element.image}')` }}></div></td>
                                    <td>
                                        <div className="action">
                                            <button className='edit' onClick={() =>{
                                                setUpdateData(element);
                                                setShowUpdateCatModal(true);
                                            }}><i className="fa-solid fa-pen"></i></button>
                                            <button className='delete' onClick={()=>{
                                                setDeleteData(element);
                                                setShowDeleteCatModal(true);
                                            }}><i className="fa-solid fa-trash"></i></button>
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
