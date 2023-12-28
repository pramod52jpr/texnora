import React, { useEffect, useState } from 'react'
import '../adminCss/sliderImage.css'
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import Header from '../adminComponents/Header';

export default function SliderImage() {
    const [loading, setLoading] = useState(true);
    const [showAddSliderModal, setShowAddSliderModal] = useState(false);
    const [showDeleteSliderModal, setShowDeleteSliderModal] = useState(false);
    const [allSliderData, setAllSliderData] = useState([]);
    const [deleteData, setDeleteData] = useState();
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
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
        setShowAddSliderModal(false);
        setShowDeleteSliderModal(false);
    }

    async function fetchSliderImage() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const sliderApi = process.env.REACT_APP_SLIDER_IMAGE_API;
        await fetch(sliderApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setAllSliderData(res.data);
        }).catch((e) => {
            console.log("the error is " + e);
        })
    }

    useEffect(() => {
        fetchSliderImage();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showAddSliderModal} style={modalStyle}>
                <AddSlider closeModal={closeModal} fetchSliderImage={fetchSliderImage} />
            </ReactModal>
            <ReactModal ariaHideApp={false} isOpen={showDeleteSliderModal} style={modalStyle}>
                <DeleteSlider closeModal={closeModal} fetchSliderImage={fetchSliderImage} deleteData={deleteData} />
            </ReactModal>
            <Header />
            <div className="sliderImage">
                {
                    loading ? <div style={{ height: "300px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ReactLoading type='spokes' height={50} width={50} color='green' />
                    </div>
                        : <>
                            <div className="topOptions">
                                <button style={{ backgroundColor: allSliderData.length === 0 ? "green" : "grey" }} onClick={() => allSliderData.length === 0 ? setShowAddSliderModal(true) : null}><i className="fa-solid fa-circle-plus"></i></button>
                                <button style={{ backgroundColor: allSliderData.length !== 0 ? "rgb(190, 0, 0)" : "grey" }} className='delete' onClick={() => {
                                    if (allSliderData.length !== 0) {
                                        setDeleteData(allSliderData[0]);
                                        setShowDeleteSliderModal(true);
                                    }
                                }}><i className="fa-solid fa-trash"></i></button>
                            </div>
                            <div className="image">
                                {
                                    allSliderData.length === 0 ? <h3>No Image added</h3> :
                                        <img width={"100%"} src={`${imgBaseUrl}/storage/sliderimages/${allSliderData[0].image}`} alt="" />
                                }
                            </div>
                        </>
                }
            </div>
        </>
    )
}

function AddSlider(props) {
    const [submitLoading, setSubmitLoading] = useState(false);
    const [imgUrl, setImgUrl] = useState("");
    const [imageFile, setImageFile] = useState();

    function onChangeImage(e) {
        if (e.target.files[0]) {
            setImageFile(e.target.files[0]);
            setImgUrl(URL.createObjectURL(e.target.files[0]));
        }
    }

    async function onsubmit(e) {
        e.preventDefault();
        if (imgUrl.length === 0) {
            alert("Please Upload Image");
        } else {
            setSubmitLoading(true);
            const token = process.env.REACT_APP_TOKEN;
            const sliderUrl = process.env.REACT_APP_SLIDER_IMAGE_API;

            const formData = new FormData();
            formData.append("image", imageFile);
            await fetch(sliderUrl, {
                method: "post",
                headers: { token },
                body: formData
            }).then(res => res.json()).then((res) => {
                setSubmitLoading(false);
                alert("Image Added Successfully");
                props.closeModal();
                props.fetchSliderImage();
            }).catch((e) => {
                setSubmitLoading(false);
                alert("Image not added because of some error");
            })
        }
    }
    return (
        <div className="addSlider">
            <div className="cancel">
                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
            </div>
            <h1>Add Category</h1>
            <form onSubmit={onsubmit}>
                <label htmlFor="sliderImage">
                    {
                        imgUrl.length === 0 ? <i className="fa-regular fa-image"></i> : <img src={imgUrl} width={"100%"} height={"100%"} alt='' />
                    }
                </label>
                <input type="file" onChange={onChangeImage} name="sliderImage" id="sliderImage" accept='.jpg,.png,.jpeg' />
                <button type='submit'>{submitLoading ?
                    <div align="center" style={{ width: "100%", height: "100%" }}>
                        <ReactLoading type='spin' color='white' width={"10%"} height={"100%"} />
                    </div>
                    : "Submit"}</button>
            </form>
        </div>
    )
}


function DeleteSlider(props) {
    const [deleteLoading, setDeleteLoading] = useState(false);
    const deleteData = props.deleteData;

    async function ondelete() {
        setDeleteLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const apiUrl = process.env.REACT_APP_SLIDER_IMAGE_API;
        await fetch(apiUrl, {
            method: "delete",
            headers: {
                token,
                "id": deleteData.id,
            }
        }).then(res => res.json()).then((res) => {
            setDeleteLoading(false);
            alert("Category deleted successfully");
            props.closeModal();
            props.fetchSliderImage();
        }).catch(() => {
            setDeleteLoading(false);
            alert("Category not deleted because of some error");
        })
    }
    return (
        <div className="deleteSlider">
            <p>Are you Sure you want to delete?</p>
            <div className="btns">
                <button className='delete' onClick={ondelete}>{deleteLoading ?
                    <div align="center" style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ReactLoading type='spin' color='white' width={"25%"} height={"auto"} />
                    </div>
                    : "Delete"}</button>
                <button className='cancel' onClick={props.closeModal}>Cancel</button>
            </div>
        </div>
    )
}