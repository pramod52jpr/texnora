import React, { useState } from 'react'
import '../adminCss/addProduct.css';
import ReactLoading from 'react-loading';
import SuccessModal from '../components/SuccessModal';
import FailureModal from '../components/FailureModal';

export default function AddProduct(props) {
    const [done, setDone] = useState(false);
    const [fail, setFail] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const allCategoryData = props.allCategoryData;
    const [inputs, setInputs] = useState({
        cid: "",
        pro_no: "",
        name: "",
        description: "",
        material: "",
        size: "",
        color: "",
    });
    const [imgUrl1, setImgUrl1] = useState("");
    const [imgUrl2, setImgUrl2] = useState("");
    const [imgUrl3, setImgUrl3] = useState("");
    const [imgUrl4, setImgUrl4] = useState("");
    const [imageFile1, setImageFile1] = useState();
    const [imageFile2, setImageFile2] = useState();
    const [imageFile3, setImageFile3] = useState();
    const [imageFile4, setImageFile4] = useState();

    function onChangeImage1(e) {
        if (e.target.files[0]) {
            setImageFile1(e.target.files[0]);
            setImgUrl1(URL.createObjectURL(e.target.files[0]));
        }
    }
    function onChangeImage2(e) {
        if (e.target.files[0]) {
            setImageFile2(e.target.files[0]);
            setImgUrl2(URL.createObjectURL(e.target.files[0]));
        }
    }
    function onChangeImage3(e) {
        if (e.target.files[0]) {
            setImageFile3(e.target.files[0]);
            setImgUrl3(URL.createObjectURL(e.target.files[0]));
        }
    }
    function onChangeImage4(e) {
        if (e.target.files[0]) {
            setImageFile4(e.target.files[0]);
            setImgUrl4(URL.createObjectURL(e.target.files[0]));
        }
    }

    async function onsubmit(e) {
        e.preventDefault();
        if (imgUrl1.length === 0 || imgUrl2.length === 0 || imgUrl3.length === 0 || imgUrl4.length === 0) {
            alert("Please Upload All Images");
        } else {
            setSubmitLoading(true);
            const token = process.env.REACT_APP_TOKEN;
            const proApi = process.env.REACT_APP_PRODUCT_API;
            const formData = new FormData();
            formData.append("image1", imageFile1);
            formData.append("image2", imageFile2);
            formData.append("image3", imageFile3);
            formData.append("image4", imageFile4);
            formData.append("body", JSON.stringify(inputs));
            await fetch(proApi, {
                method: "post",
                headers: { token },
                body: formData
            }).then(res => res.json()).then((res) => {
                setSubmitLoading(false);
                setDone(true);
                props.fetchProducts();
            }).catch((e) => {
                setSubmitLoading(false);
                setFail(true);
            })
        }
    }

    return (
        <>
            {
                done ?
                    <SuccessModal h1={"Success"} p={"Product Added Successfully"} closeModal={props.closeModal} />
                    : fail ?
                        <FailureModal h1={"Sorry !"} p={"There is some server issue. Please try again later."} closeModal={props.closeModal} />
                        :
                        <div className="addProduct">
                            <div className="cancel">
                                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <h1>Add Category</h1>
                            <form onSubmit={onsubmit}>
                                <div className="images">
                                    <label htmlFor="proImg1">
                                        {
                                            imgUrl1.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl1} width={"100%"} height={"100%"} alt='' />
                                        }
                                    </label>
                                    <input type="file" onChange={onChangeImage1} name="proImg1" id="proImg1" accept='.jpg,.png,.jpeg' />
                                    <label htmlFor="proImg2">
                                        {
                                            imgUrl2.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl2} width={"100%"} height={"100%"} />
                                        }
                                    </label>
                                    <input type="file" onChange={onChangeImage2} name="proImg2" id="proImg2" accept='.jpg,.png,.jpeg' />
                                    <label htmlFor="proImg3">
                                        {
                                            imgUrl3.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl3} width={"100%"} height={"100%"} alt='' />
                                        }
                                    </label>
                                    <input type="file" onChange={onChangeImage3} name="proImg3" id="proImg3" accept='.jpg,.png,.jpeg' />
                                    <label htmlFor="proImg4">
                                        {
                                            imgUrl4.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl4} width={"100%"} height={"100%"} alt='' />
                                        }
                                    </label>
                                    <input type="file" onChange={onChangeImage4} name="proImg4" id="proImg4" accept='.jpg,.png,.jpeg' />
                                </div>
                                <select name='cid' defaultValue={""} onChange={(e) => setInputs({ ...inputs, cid: e.target.value })} required>
                                    <option value="" disabled>Select Category</option>
                                    {
                                        allCategoryData.map(element => <option key={element.id} value={element.id}>{element.name}</option>)
                                    }
                                </select>
                                <input type="text" name="name" id="name" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} placeholder='Enter Name' required />
                                <input type="text" name="pro_no" id="pro_no" value={inputs.pro_no} onChange={(e) => setInputs({ ...inputs, pro_no: e.target.value })} placeholder='Enter Id' required />
                                <textarea name="description" id="description" cols="30" rows="3" value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} placeholder='Enter Decription' required></textarea>
                                <input type="text" name="material" id="material" value={inputs.material} onChange={(e) => setInputs({ ...inputs, material: e.target.value })} placeholder='Material' required />
                                <input type="text" name="size" id="size" value={inputs.size} onChange={(e) => setInputs({ ...inputs, size: e.target.value })} placeholder='Size' required />
                                <input type="text" name="color" id="color" value={inputs.color} onChange={(e) => setInputs({ ...inputs, color: e.target.value })} placeholder='Color' required />
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
