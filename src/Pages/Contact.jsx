import React, { useState } from 'react'
import '../css/contact.css'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';
import ReactModal from 'react-modal';
import SuccessModal from '../components/SuccessModal';

export default function Contact() {
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
    return (
        <>

            <ReactModal ariaHideApp={false} isOpen={doneModal} style={modalStyle}>
                <SuccessModal h1={"Thanks"} p={"Thank you for Contacting Us, Our team will get back to you shortly"} closeModal={closeModal} />
            </ReactModal>
            <div className="contactBg" style={{ backgroundImage: "url('assets/contact/contactbg.png')" }}>
                Contact Us
            </div>
            <div className="contactForm">
                <div className="contactInformation">
                    <h2>Lets Talk</h2>
                    <h1>Speak with Our Team</h1>
                    <div className="information">
                        <div className="icon">
                            <i className="fa-solid fa-house"></i>
                        </div>
                        <div className="content">
                            <div className="label">Email:</div>
                            <Link to={"mailto:kru.texnora@gmail.com"} className="value">kru.texnora@gmail.com</Link>
                        </div>
                    </div>
                    <div className="information">
                        <div className="icon">
                            <i className="fa-solid fa-phone"></i>
                        </div>
                        <div className="content">
                            <div className="label">Phone:</div>
                            <Link to={"tel:+91 93600 57155"} className="value">+91 93600 57155</Link>
                        </div>
                    </div>
                    <div className="information">
                        <div className="icon">
                            <i className="fa-solid fa-location-dot"></i>
                        </div>
                        <div className="content">
                            <div className="label">Address:</div>
                            <div className="value">4/46-A, Sadaiyam palayam, Andankovil Melbagam, Karur-India-639008</div>
                        </div>
                    </div>
                </div>
                <div className="form">
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
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62670.88055137304!2d78.01166415768289!3d10.968653717978029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f27dcbe6ec3%3A0x9dff5b01b686f1e0!2sTamil%20Nadu%20639008!5e0!3m2!1sen!2sin!4v1702464385522!5m2!1sen!2sin" width="100%" height="300" title='Map' allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </>
    )
}
