import React from 'react'
import '../css/successModal.css'
import Lottie from 'lottie-react';
import failure from '../animation/failure.json';

export default function FailureModal(props) {
  return (
    <div className="success">
    <Lottie className='lottie' animationData={failure} />
    <div className="content">
        <h1>{props.h1}</h1>
        <p>{props.p}</p>
        <button onClick={props.closeModal}>Done</button>
    </div>
</div>
  )
}
