import React, { useEffect, useState } from 'react'
import '../adminCss/addCategoryForm.css'
import ReactLoading from 'react-loading';
import SuccessModal from '../components/SuccessModal';
import FailureModal from '../components/FailureModal';

export default function UpdateCategory(props) {
    const [done, setDone] = useState(false);
    const [fail, setFail] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [imageFile, setImageFile] = useState();
    const [inputs, setInputs] = useState({ name: "" });
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    const updateData = props.updateData;
    function onChangeImage(e) {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImgUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    async function onsubmit(e) {
        e.preventDefault();
        setUpdateLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const apiUrl = process.env.REACT_APP_CAT_UPDATE_API;
        const formData = new FormData();
        if (typeof (imageFile) == "object") {
            formData.append("image", imageFile);
        }
        formData.append("body", JSON.stringify(inputs));
        await fetch(apiUrl, {
            method: "post",
            headers: {
                token,
                id: updateData.id,
            },
            body: formData
        }).then(res => res.json()).then((res) => {
            setUpdateLoading(false);
            setDone(true);
            props.fetchCategories();
        }).catch((e) => {
            setUpdateLoading(false);
            setFail(true);
        })
    }

    useEffect(() => {
        setImgUrl(`${imgBaseUrl}/storage/categoryimages/${updateData.image}`);
        setInputs({ ...inputs, name: updateData.name });
    }, []);
    return (
        <>
            {
                done ?
                    <SuccessModal h1={"Success"} p={"Category Updated Successfully"} closeModal={props.closeModal} />
                    : fail ?
                        <FailureModal h1={"Sorry !"} p={"There is some server issue. Please try again later."} closeModal={props.closeModal} />
                        :
                        <div className="addCategoryForm">
                            <div className="cancel">
                                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <h1>Update Category</h1>
                            <form onSubmit={onsubmit}>
                                <label htmlFor="catImage">
                                    {
                                        imgUrl.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl} width={"100%"} height={"100%"} alt='' />
                                    }
                                </label>
                                <input type="file" onChange={onChangeImage} name="catImage" id="catImage" accept='.jpg,.png,.jpeg' />
                                <input type="text" placeholder={"Enter Name"} value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} required />
                                <button type='submit'>{updateLoading ?
                                    <div align="center" style={{ width: "100%", height: "100%" }}>
                                        <ReactLoading type='spin' color='white' width={"10%"} height={"100%"} />
                                    </div>
                                    : "Update"}</button>
                            </form>
                        </div>
            }
        </>
    )
}
