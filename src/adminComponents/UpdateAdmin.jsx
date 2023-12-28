import React, { useEffect, useState } from 'react'
import '../adminCss/updateAdmin.css'
import ReactLoading from 'react-loading';

export default function UpdateAdmin(props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });
    const updateData = props.updateData;

    async function onsubmit(e) {
        e.preventDefault();
        setSubmitLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const adminUpdateApi = process.env.REACT_APP_ADMIN_UPDATE_API;

        const formData = new FormData();
        formData.append("body", JSON.stringify(inputs));
        await fetch(adminUpdateApi, {
            method: "post",
            headers: {
                token,
                id: updateData.id
            },
            body: formData
        }).then(res => res.json()).then((res) => {
            setSubmitLoading(false);
            alert("Admin Updated Successfully");
            props.closeModal();
            props.fetchAdminsData();
        }).catch((e) => {
            setSubmitLoading(false);
            alert("Admin not updated because of some error");
        })
    }
    useEffect(() => {
        setInputs({ ...inputs, email: updateData.email, password: updateData.password });
    }, []);
    return (
        <div className="updateAdminForm">
            <div className="cancel">
                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <h1>Update Admin</h1>
            <form onSubmit={onsubmit}>
                <input type="email" placeholder={"Enter Email"} value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} required />
                <input type="password" placeholder='Enter Password' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} required />
                <button type='submit'>{submitLoading ?
                    <div align="center" style={{ width: "100%", height: "100%" }}>
                        <ReactLoading type='spin' color='white' width={"10%"} height={"100%"} />
                    </div>
                    : "Update"}</button>
            </form>
        </div>
    )
}
