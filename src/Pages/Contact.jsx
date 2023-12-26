import React from 'react'
import '../css/contact.css'
import { Link } from 'react-router-dom'

export default function Contact() {
    return (
        <>
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
                    <form action="">
                        <input type="text" placeholder='Name' />
                        <input type="email" placeholder='Email' />
                        <textarea name="" id="" cols="30" rows="7" placeholder='Message'></textarea>
                        <button type='submit'>Submit</button>
                    </form>
                </div>
            </div>
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d62670.88055137304!2d78.01166415768289!3d10.968653717978029!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3baa2f27dcbe6ec3%3A0x9dff5b01b686f1e0!2sTamil%20Nadu%20639008!5e0!3m2!1sen!2sin!4v1702464385522!5m2!1sen!2sin" width="100%" height="300" allowFullScreen="" loading="lazy" referrerPolicy="no-referrer-when-downgrade"></iframe>
        </>
    )
}
