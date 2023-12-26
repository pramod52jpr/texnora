import React, { useState } from 'react'
import '../adminCss/addCategoryForm.css'
import ReactLoading from 'react-loading';

export default function AddCategory(props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [imageFile, setImageFile] = useState();
    const [inputs, setInputs] = useState({ name: "" });

    function onChangeImage(e) {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImgUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    async function onsubmit(e) {
        e.preventDefault();
        setSubmitLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const apiUrl = process.env.REACT_APP_CAT_API;

        const formData = new FormData();
        formData.append("image", imageFile);
        formData.append("body", JSON.stringify(inputs));
        await fetch(apiUrl, {
            method:"post",
            headers: { token },
            body: formData
        }).then(res => res.json()).then((res) => {
            setSubmitLoading(false);
            alert("Category Added Successfully");
            props.closeModal();
            props.fetchCategories();
        }).catch((e) => {
            setSubmitLoading(false);
            alert("Category not added because of some error");
        })
    }

    return (
        <div className="addCategoryForm">
            <div className="cancel">
                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <h1>Add Category</h1>
            <form onSubmit={onsubmit}>
                <label htmlFor="catImage">
                    {
                        imgUrl.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl} width={"100%"} height={"100%"} alt='' />
                    }
                </label>
                <input type="file" onChange={onChangeImage} name="catImage" id="catImage" accept='.jpg,.png,.jpeg' required />
                <input type="text" placeholder={"Enter Name"} value={inputs.name} onChange={(e) => setInputs({ ...inputs, name: e.target.value })} required />
                <button type='submit'>{submitLoading ?
                    <div align="center" style={{ width: "100%", height: "100%" }}>
                        <ReactLoading type='spin' color='white' width={"10%"} height={"100%"} />
                    </div>
                    : "Submit"}</button>
            </form>
        </div>
    )
}
