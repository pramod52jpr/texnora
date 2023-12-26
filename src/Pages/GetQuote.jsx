import React, { useState } from 'react'
import '../css/getQuote.css'
import ReactLoading from 'react-loading';
import Lottie from 'lottie-react';
import quote_success from '../animation/quote_success.json';

export default function GetQuote(props) {
    const [done, setDone] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        comment: "",
        product: props.pid
    });

    async function onsubmit(e) {
        e.preventDefault();
        if (inputs.phone.length !== 10) {
            alert("Enter a valid phone no");
        } else {
            setSubmitLoading(true);
            const token = process.env.REACT_APP_TOKEN;
            const quoteUrl = process.env.REACT_APP_QUOTE_API;
            const formData = new FormData();
            formData.append("body", JSON.stringify(inputs));
            await fetch(quoteUrl, {
                method: "post",
                headers: { token },
                body: formData,
            }).then(res => res.json()).then(() => {
                setSubmitLoading(false);
                setDone(true);
            }).catch(() => {
                setSubmitLoading(false);
                alert("Data not added because of some error");
            });
        }
    }
    return (
        <>
            <div className="getQuote">
                {
                    done ?
                        <div className="successGetQuote">
                            <Lottie className='lottie' animationData={quote_success} />
                            <div className="content">
                                <h1>Quote Request Sent</h1>
                                <p>Thankyou for your Request, Our team will get back to you</p>
                                <button onClick={props.closeModal}>Done</button>
                            </div>
                        </div>
                        :
                        <>
                            <div className="cancel">
                                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <h1>Get Quote</h1>
                            <form onSubmit={onsubmit}>
                                <label htmlFor="name">Name</label>
                                <input type="text" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} name="name" id="name" required />
                                <label htmlFor="phone">Phone No.</label>
                                <input type="number" value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} name="phone" id="phone" required />
                                <label htmlFor="email">Email</label>
                                <input type="email" value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} name="email" id="email" required />
                                <label htmlFor="address">Address</label>
                                <textarea name="address" value={inputs.address} onChange={(e) => setInputs({ ...inputs, address: e.target.value })} id="address" cols="30" rows="3" required></textarea>
                                <label htmlFor="comment">Comments</label>
                                <textarea name="comment" value={inputs.comment} onChange={(e) => setInputs({ ...inputs, comment: e.target.value })} id="comment" cols="30" rows="3" required></textarea>
                                <div className="btns">
                                    <button type='button' onClick={props.closeModal}>Cancel</button>
                                    <button type='submit' className='submit'>{submitLoading ?
                                        <div align="center" style={{ width: "100%", height: "100%" }}>
                                            <ReactLoading type='spin' color='white' width={"15%"} height={"100%"} />
                                        </div>
                                        : "Submit"}</button>
                                </div>
                            </form>
                        </>
                }
            </div>
        </>
    )
}
