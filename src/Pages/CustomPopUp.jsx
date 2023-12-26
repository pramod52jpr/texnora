import React, { useState } from 'react'
import '../css/customPopup.css'
import ReactLoading from 'react-loading';
import Lottie from 'lottie-react';
import quote_success from '../animation/quote_success.json';

export default function CustomPopUp(props) {
  const [done, setDone] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [imgUrl, setImgUrl] = useState("");
  const [imageFile, setImageFile] = useState();
  const [inputs, setInputs] = useState({
    name: "",
    description: "",
    material: "",
    size: "",
    color: "",
    customer_name: "",
    customer_email: "",
    customer_phone: "",
    product: props.pid,
  })

  function onChangeImage(e) {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
      setImgUrl(URL.createObjectURL(e.target.files[0]));
    }
  }

  async function onsubmit(e) {
    e.preventDefault();
    if (inputs.customer_phone.length !== 10) {
      alert("Enter a valid phone no");
    } else {
      setSubmitLoading(true);
      const token = process.env.REACT_APP_TOKEN;
      const customUrl = process.env.REACT_APP_CUSTOM_API;
      const formData = new FormData();
      if(typeof(imageFile)==="object"){
        formData.append("image",imageFile);
      }
      formData.append("body", JSON.stringify(inputs));
      await fetch(customUrl, {
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
    <div className="customPopup">
      {
        done ?
          <div className="successCustom">
            <Lottie className='lottie' animationData={quote_success} />
            <div className="content">
              <h1>Requirment added</h1>
              <p>Thank you for your requirements, Our team will get back to you shortly</p>
              <button onClick={props.closeModal}>Done</button>
            </div>
          </div>
          :
          <>
            <div className="cancel">
              <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <h1>Share Your Perfect Textile Style!</h1>
            <p>Please share your product requirements by filling out the fields below, and our team will reach out to you shortly.</p>
            <form onSubmit={onsubmit}>
              <label htmlFor="image">
                {
                  imgUrl.length == 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl} width={"100%"} height={"100%"} />
                }
              </label>
              <input type="file" onChange={onChangeImage} name="image" id="image" accept='.jpg,.png,.jpeg' />
              <input type="text" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} placeholder='Name' name="name" id="name" />
              <textarea value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} placeholder='Description' name="description" id="description" cols="30" rows="4"></textarea>
              <input type="text" value={inputs.material} onChange={(e) => setInputs({ ...inputs, material: e.target.value })} placeholder='Material' name="material" id="material" />
              <input type="text" value={inputs.size} onChange={(e) => setInputs({ ...inputs, size: e.target.value })} placeholder='Size' name="size" id="size" />
              <input type="text" value={inputs.color} onChange={(e) => setInputs({ ...inputs, color: e.target.value })} placeholder='Color' name="color" id="color" />
              <h2>Customer details</h2>
              <input type="text" value={inputs.customer_name} onChange={(e) => setInputs({ ...inputs, customer_name: e.target.value })} placeholder='Enter Your Name' name="customerName" id="customerName" required />
              <input type="text" value={inputs.customer_email} onChange={(e) => setInputs({ ...inputs, customer_email: e.target.value })} placeholder='Enter Email' name="email" id="email" required />
              <input type="number" value={inputs.customer_phone} onChange={(e) => setInputs({ ...inputs, customer_phone: e.target.value })} placeholder='Enter Mobile No.' name="phone" id="phone" required />
              <button type='submit'>{submitLoading ?
                <div align="center" style={{ width: "100%", height: "100%" }}>
                  <ReactLoading type='spin' color='white' width={"10%"} height={"100%"} />
                </div>
                : "Submit"}</button>
            </form>
          </>
      }
    </div>
  )
}
