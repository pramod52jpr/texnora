import React, { useEffect, useState } from 'react'
import '../adminCss/addProduct.css';
import ReactLoading from 'react-loading';

export default function UpdateProduct(props) {

    const [updateLoading, setUpdateLoading] = useState(false);
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
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    const updateData = props.updateData;

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
            setUpdateLoading(true);
            const token = process.env.REACT_APP_TOKEN;
            const proApi = process.env.REACT_APP_PRODUCT_UPDATE_API;
            const formData = new FormData();

            if (typeof (imageFile1) == "object") {
                formData.append("image1", imageFile1);
            }
            if (typeof (imageFile2) == "object") {
                formData.append("image2", imageFile2);
            }
            if (typeof (imageFile3) == "object") {
                formData.append("image3", imageFile3);
            }
            if (typeof (imageFile4) == "object") {
                formData.append("image4", imageFile4);
            }
            formData.append("body", JSON.stringify(inputs));
            await fetch(proApi, {
                method: "post",
                headers: {
                    token,
                    id: updateData.id
                },
                body: formData
            }).then(res => res.json()).then((res) => {
                setUpdateLoading(false);
                alert("Product Updated Successfully");
                props.closeModal();
                props.fetchProducts();
            }).catch((e) => {
                setUpdateLoading(false);
                alert("Product not Updated because of some error");
            })
        }
    }
    useEffect(() => {
        setImgUrl1(`${imgBaseUrl}/storage/productimages/${updateData.img1}`);
        setImgUrl2(`${imgBaseUrl}/storage/productimages/${updateData.img2}`);
        setImgUrl3(`${imgBaseUrl}/storage/productimages/${updateData.img3}`);
        setImgUrl4(`${imgBaseUrl}/storage/productimages/${updateData.img4}`);
        setInputs({
            ...inputs,
            cid: updateData.cid,
            pro_no: updateData.pro_no,
            name: updateData.name,
            description: updateData.description,
            material: updateData.material,
            size: updateData.size,
            color: updateData.color,
        });
    }, []);
    return (
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
                            imgUrl2.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl2} width={"100%"} height={"100%"} alt='' />
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
                <select name='cid' defaultValue={updateData.cid} onChange={(e) => setInputs({ ...inputs, cid: e.target.value })} required>
                    <option value="" disabled>Select Category</option>
                    {
                        allCategoryData.map(element => <option key={element.id} value={element.id}>{element.name}</option>)
                    }
                </select>
                <input type="text" name="name" id="name" value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} placeholder='Enter Name' required />
                <input type="text" name="pro_no" id="pro_no" value={inputs.pro_no} onChange={(e) => setInputs({ ...inputs, pro_no: e.target.value })} placeholder='Enter Id' required />
                <textarea name="description" id="description" cols="30" rows="3" value={inputs.description} onChange={(e) => setInputs({ ...inputs, description: e.target.value })} placeholder='Enter Decription' required></textarea>
                <input type="text" name="material" id="material" value={inputs.material} onChange={(e) => setInputs({ ...inputs, material: e.target.value })} placeholder='Material' />
                <input type="text" name="size" id="size" value={inputs.size} onChange={(e) => setInputs({ ...inputs, size: e.target.value })} placeholder='Size' />
                <input type="text" name="color" id="color" value={inputs.color} onChange={(e) => setInputs({ ...inputs, color: e.target.value })} placeholder='Color' />
                <button type='submit'>{updateLoading ?
                    <div align="center" style={{ width: "100%", height: "100%" }}>
                        <ReactLoading type='spin' color='white' width={"10%"} height={"100%"} />
                    </div>
                    : "Update"}</button>
            </form>
        </div>
    )
}
