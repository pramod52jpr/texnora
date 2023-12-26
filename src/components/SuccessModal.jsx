import React from 'react'
import '../css/successModal.css'
import Lottie from 'lottie-react';
import quote_success from '../animation/quote_success.json';

export default function SuccessModal(props) {
    return (
        <div className="success">
            <Lottie className='lottie' animationData={quote_success} />
            <div className="content">
                <h1>{props.h1}</h1>
                <p>{props.p}</p>
                <button onClick={props.closeModal}>Done</button>
            </div>
        </div>
    )
}
