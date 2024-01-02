import React, { useEffect, useState } from 'react'
import '../css/contact.css'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';
import ReactModal from 'react-modal';
import SuccessModal from '../components/SuccessModal';

export default function Contact() {
    const [loading, setLoading] = useState(true);
    const [companyDetails, setCompanyDetails] = useState([]);
    const [doneModal, setDoneModal] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        message: "",
    });
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
        setDoneModal(false);
    }

    async function onsubmit(e) {
        e.preventDefault();
        setSubmitLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const contactUrl = process.env.REACT_APP_CONTACT_API;
        const formData = new FormData();
        formData.append("body", JSON.stringify(inputs));
        await fetch(contactUrl, {
            method: "post",
            headers: { token },
            body: formData,
        }).then(res => res.json()).then(() => {
            setSubmitLoading(false);
            setDoneModal(true);
            setInputs({
                ...inputs,
                name: "",
                email: "",
                message: "",
            });
        }).catch(() => {
            setSubmitLoading(false);
            alert("Data not added because of some error");
        });
    }

    async function fetchCompanyDetails() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const companyDetailsApi = process.env.REACT_APP_COMPANY_DETAILS_API;
        await fetch(companyDetailsApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setCompanyDetails(res.data);
        });
    }

    useEffect(() => {
        fetchCompanyDetails();
    }, []);
    return (
        <>

            <ReactModal ariaHideApp={false} isOpen={doneModal} style={modalStyle}>
                <SuccessModal h1={"Thanks"} p={"Thank you for Contacting Us, Our team will get back to you shortly"} closeModal={closeModal} />
            </ReactModal>
            <div className="contactBg" style={{ overflow: "hidden", backgroundImage: "url('assets/contact/contactbg.png')" }}>
                <div data-aos="zoom-out">Contact Us</div>
            </div>
            <div className="contactForm" style={{ overflow: "hidden" }}>
                <div className="contactInformation" data-aos="fade-right">
                    <h2>Lets Talk</h2>
                    <h1>Speak with Our Team</h1>
                    {
                        loading ? <div style={{ height: "100px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ReactLoading type='spokes' height={40} width={40} color='white' />
                        </div>
                            :
                            <>
                                <div className="information">
                                    <div className="icon">
                                        <i className="fa-solid fa-house"></i>
                                    </div>
                                    <div className="content">
                                        <div className="label">Email:</div>
                                        <Link to={`mailto:${companyDetails[0].email}`} className="value">{companyDetails[0].email}</Link>
                                    </div>
                                </div>
                                <div className="information">
                                    <div className="icon">
                                        <i className="fa-solid fa-phone"></i>
                                    </div>
                                    <div className="content">
                                        <div className="label">Phone:</div>
                                        <Link to={`tel:+91 ${companyDetails[0].phone}`} className="value">+91 {companyDetails[0].phone}</Link>
                                    </div>
                                </div>
                                <div className="information">
                                    <div className="icon">
                                        <i className="fa-solid fa-location-dot"></i>
                                    </div>
                                    <div className="content">
                                        <div className="label">Address:</div>
                                        <div className="value">{companyDetails[0].address}</div>
                                    </div>
                                </div>
                            </>
                    }
                </div>
                <div className="form" data-aos="fade-left">
                    <h2>Get In Touch</h2>
                    <h1>Fill in the Form Below</h1>
                    <form onSubmit={onsubmit}>
                        <input type="text" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} placeholder='Name' required />
                        <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} placeholder='Email' required />
                        <textarea name="" id="" value={inputs.message} onChange={(e) => setInputs({ ...inputs, message: e.target.value })} cols="30" rows="7" placeholder='Message' required></textarea>
                        <button type='submit'>{submitLoading ?
                            <div align="center" style={{ width: "100%", height: "100%" }}>
                                <ReactLoading type='spin' color='white' width={"7%"} height={"100%"} />
                            </div>
                            : "Submit"}</button>
                    </form>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3916.7511787458125!2d78.01312209999999!3d10.9821444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa293184b322fb%3A0xdb90e8bd04b0bcb7!2sTex%20Nora!5e0!3m2!1sen!2sin!4v1704109652959!5m2!1sen!2sin" width="100%" height="300" title='Map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </>
    )
}
