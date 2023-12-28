import React, { useState } from 'react'
import '../adminCss/deleteAdmin.css'
import ReactLoading from 'react-loading';

export default function DeleteAdmin(props) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteData = props.deleteData;

    async function ondelete() {
        setDeleteLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const deleteAdminUrl = process.env.REACT_APP_ADMIN_API;
        await fetch(deleteAdminUrl, {
            method: "delete",
            headers: {
                token,
                "id": deleteData.id,
            }
        }).then(res => res.json()).then((res) => {
            setDeleteLoading(false);
            alert("Admin deleted successfully");
            props.closeModal();
            props.fetchAdminsData();
        }).catch(() => {
            setDeleteLoading(false);
            alert("Admin not deleted because of some error");
        })
    }
    return (
        <div className="deleteAdmin">
            <div className="item">
                <h2>Email : {deleteData.email}</h2>
                <h2>Password : {deleteData.password}</h2>
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
