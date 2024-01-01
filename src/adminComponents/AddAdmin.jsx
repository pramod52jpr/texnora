import React, { useState } from 'react'
import '../adminCss/addAdmin.css'
import ReactLoading from 'react-loading';
import SuccessModal from '../components/SuccessModal';
import FailureModal from '../components/FailureModal';

export default function AddAdmin(props) {
    const [done, setDone] = useState(false);
    const [fail, setFail] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        password: "",
    });

    async function onsubmit(e) {
        e.preventDefault();
        setSubmitLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const adminApi = process.env.REACT_APP_ADMIN_API;

        const formData = new FormData();
        formData.append("body", JSON.stringify(inputs));
        await fetch(adminApi, {
            method: "post",
            headers: { token },
            body: formData
        }).then(res => res.json()).then((res) => {
            setSubmitLoading(false);
            setDone(true);
            props.fetchAdminsData();
        }).catch((e) => {
            setSubmitLoading(false);
            setFail(true);
        })
    }
    return (
        <>
            {
                done ?
                    <SuccessModal h1={"Success"} p={"Admin Added Successfully"} closeModal={props.closeModal} />
                    : fail ?
                        <FailureModal h1={"Sorry !"} p={"There is some server issue. Please try again later."} closeModal={props.closeModal} />
                        :
                        <div className="addAdminForm">
                            <div className="cancel">
                                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <h1>Add Admin</h1>
                            <form onSubmit={onsubmit}>
                                <input type="email" placeholder={"Enter Email"} value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} required />
                                <input type="password" placeholder='Enter Password' value={inputs.password} onChange={(e) => setInputs({ ...inputs, password: e.target.value })} required />
                                <button type='submit'>{submitLoading ?
                                    <div align="center" style={{ width: "100%", height: "100%" }}>
                                        <ReactLoading type='spin' color='white' width={"10%"} height={"100%"} />
                                    </div>
                                    : "Submit"}</button>
                            </form>
                        </div>
            }
        </>
    )
}
