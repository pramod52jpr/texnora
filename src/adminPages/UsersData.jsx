import React, { useEffect, useState } from 'react'
import '../adminCss/usersData.css'
import Header from '../adminComponents/Header'
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import AddAdmin from '../adminComponents/AddAdmin';
import UpdateAdmin from '../adminComponents/UpdateAdmin';
import DeleteAdmin from '../adminComponents/DeleteAdmin';

export default function UsersData() {
    const [loading, setLoading] = useState(false);
    const [allAdminData, setAllAdminData] = useState([]);
    const [showAddAdminModal, setShowAddAdminModal] = useState(false);
    const [showUpdateAdminModal, setShowUpdateAdminModal] = useState(false);
    const [showDeleteAdminModal, setShowDeleteAdminModal] = useState(false);
    const [updateData, setUpdateData] = useState();
    const [deleteData, setDeleteData] = useState();
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
        setShowAddAdminModal(false);
        setShowUpdateAdminModal(false);
        setShowDeleteAdminModal(false);
    }

    async function fetchAdminsData() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const quoteApi = process.env.REACT_APP_ADMIN_API;
        await fetch(quoteApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setAllAdminData(res.data);
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
    }

    useEffect(() => {
        fetchAdminsData();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showAddAdminModal} style={modalStyle}>
                <AddAdmin closeModal={closeModal} fetchAdminsData={fetchAdminsData} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showUpdateAdminModal} style={modalStyle}>
                <UpdateAdmin closeModal={closeModal} fetchAdminsData={fetchAdminsData} updateData={updateData} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showDeleteAdminModal} style={modalStyle}>
                <DeleteAdmin closeModal={closeModal} fetchAdminsData={fetchAdminsData} deleteData={deleteData} />
            </ReactModal>
            <Header title={"Admin Data"} />
            <div className="adminDatas">
                <div className="topOptions">
                    <button onClick={() => setShowAddAdminModal(true)}><i className="fa-solid fa-circle-plus"></i></button>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr align="center"><td style={{ height: "300px" }} colSpan={500}>
                                <ReactLoading type='spokes' height={50} width={50} color='green' />
                            </td></tr>
                                : allAdminData.map(element => <tr key={element.id}>
                                    <td>{element.email}</td>
                                    <td>{element.password}</td>
                                    <td>
                                        <div className="action">
                                            <button className='edit' onClick={() =>{
                                                setUpdateData(element);
                                                setShowUpdateAdminModal(true);
                                            }}><i className="fa-solid fa-pen"></i></button>
                                            <button className='delete' onClick={()=>{
                                                setDeleteData(element);
                                                setShowDeleteAdminModal(true);
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
