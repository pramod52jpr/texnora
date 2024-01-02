import React, { useEffect, useState } from 'react'
import '../adminCss/chart.css'
import ReactModal from 'react-modal';
import ReactLoading from 'react-loading';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import SuccessModal from '../components/SuccessModal';
import FailureModal from '../components/FailureModal';

export default function Chart() {
    const [loading, setLoading] = useState(true);
    const [showUpdateDetailsModal, setShowUpdateDetailsModal] = useState(false);
    const [companyDetails, setCompanyDetails] = useState([]);
    const [updateData, setUpdateData] = useState();
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
        setShowUpdateDetailsModal(false);
    }
    const [quoteData, setQuoteData] = useState([
        { name: "Jan-Mar", quote: 0 },
        { name: "Apr-Jun", quote: 0 },
        { name: "Jul-Sep", quote: 0 },
        { name: "Oct-Dec", quote: 0 }
    ]);
    const [customData, setCustomData] = useState([
        { name: "Jan-Mar", Requirements: 0 },
        { name: "Apr-Jun", Requirements: 0 },
        { name: "Jul-Sep", Requirements: 0 },
        { name: "Oct-Dec", Requirements: 0 }
    ]);
    async function fetchAllQuotes() {
        const token = process.env.REACT_APP_TOKEN;
        const quoteApi = process.env.REACT_APP_QUOTE_API;
        await fetch(quoteApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            const date = new Date();
            const q1Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["01", "02", "03"].includes(ele.date.split("-")[1]));
            const q2Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["04", "05", "06"].includes(ele.date.split("-")[1]));
            const q3Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["07", "08", "09"].includes(ele.date.split("-")[1]));
            const q4Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["10", "11", "12"].includes(ele.date.split("-")[1]));
            setQuoteData([
                { name: "Jan-Mar", Quotes: q1Data.length },
                { name: "Apr-Jun", Quotes: q2Data.length },
                { name: "Jul-Sep", Quotes: q3Data.length },
                { name: "Oct-Dec", Quotes: q4Data.length }
            ])
        });
    }
    async function fetchAllCustomReq() {
        const token = process.env.REACT_APP_TOKEN;
        const customApi = process.env.REACT_APP_CUSTOM_API;
        await fetch(customApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            const date = new Date();
            const q1Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["01", "02", "03"].includes(ele.date.split("-")[1]));
            const q2Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["04", "05", "06"].includes(ele.date.split("-")[1]));
            const q3Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["07", "08", "09"].includes(ele.date.split("-")[1]));
            const q4Data = res.data.filter(ele => parseInt(ele.date.split("-")[0]) === date.getFullYear() && ["10", "11", "12"].includes(ele.date.split("-")[1]));
            setCustomData([
                { name: "Jan-Mar", Requirements: q1Data.length },
                { name: "Apr-Jun", Requirements: q2Data.length },
                { name: "Jul-Sep", Requirements: q3Data.length },
                { name: "Oct-Dec", Requirements: q4Data.length }
            ])
        });
    }

    async function fetchCompanyDetails() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const companyDetailsApi = process.env.REACT_APP_COMPANY_DETAILS_API;
        await fetch(companyDetailsApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setCompanyDetails(res.data);
        });
    }
    useEffect(() => {
        fetchAllCustomReq();
        fetchAllQuotes();
        fetchCompanyDetails();
    }, []);
    return (
        <>
            <ReactModal ariaHideApp={false} isOpen={showUpdateDetailsModal} style={modalStyle}>
                <UpdateDetails closeModal={closeModal} fetchCompanyDetails={fetchCompanyDetails} updateData={updateData} />
            </ReactModal>
            <div className="dashboardHeader">
                <div className="content">
                    <h1>Hello Admin !</h1>
                    <p>Welcome to TexNora Admin Dashboard</p>
                </div>
            </div>
            <div className="companyDetails">
                {
                    loading ? <div style={{ height: "100px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                        <ReactLoading type='spokes' height={40} width={40} color='green' />
                    </div>
                        :
                        <div className="content">
                            <div className="details">
                                <div>Mobile : +91 {companyDetails[0].phone}</div>
                                <div>Email : {companyDetails[0].email}</div>
                                <div>Reg. Office: {companyDetails[0].address}</div>
                            </div>
                            <button onClick={() => {
                                setShowUpdateDetailsModal(true);
                                setUpdateData(companyDetails[0]);
                            }}><i className="fa-solid fa-pen"></i></button>
                        </div>
                }
            </div>
            <div className="chart">
                <BarChart
                    width={390}
                    height={300}
                    data={quoteData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Quotes" stackId="a" fill="#8884d8" />
                </BarChart>
                <BarChart
                    width={390}
                    height={300}
                    data={customData}
                    margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="Requirements" stackId="a" fill="#82ca9d" />
                </BarChart>
            </div>
        </>
    )
}


function UpdateDetails(props) {
    const [done, setDone] = useState(false);
    const [fail, setFail] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [inputs, setInputs] = useState({
        email: "",
        phone: "",
        address: "",
    });
    const updateData = props.updateData;

    async function onsubmit(e) {
        e.preventDefault();
        setSubmitLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const companyDetailsUpdateApi = process.env.REACT_APP_COMPANY_DETAILS_UPDATE_API;

        const formData = new FormData();
        formData.append("body", JSON.stringify(inputs));
        await fetch(companyDetailsUpdateApi, {
            method: "post",
            headers: {
                token,
                id: updateData.id
            },
            body: formData
        }).then(res => res.json()).then((res) => {
            setSubmitLoading(false);
            setDone(true);
            props.fetchCompanyDetails();
        }).catch((e) => {
            setSubmitLoading(false);
            setFail(true);
        })
    }
    useEffect(() => {
        console.log(updateData);
        setInputs({ ...inputs, email: updateData.email, phone: updateData.phone, address: updateData.address });
    }, []);
    return (
        <>
            {
                done ?
                    <SuccessModal h1={"Success"} p={"Details Updated Successfully"} closeModal={props.closeModal} />
                    : fail ?
                        <FailureModal h1={"Sorry !"} p={"There is some server issue. Please try again later."} closeModal={props.closeModal} />
                        :
                        <div className="updateAdminForm">
                            <div className="cancel">
                                <button onClick={props.closeModal}><i className="fa-solid fa-xmark"></i></button>
                            </div>
                            <h1>Update Details</h1>
                            <form onSubmit={onsubmit}>
                                <input type="email" placeholder={"Enter Email"} value={inputs.email} onChange={(e) => setInputs({ ...inputs, email: e.target.value })} required />
                                <input type="number" placeholder='Enter Mobile No.' value={inputs.phone} onChange={(e) => setInputs({ ...inputs, phone: e.target.value })} required />
                                <input type="text" placeholder='Enter Address' value={inputs.address} onChange={(e) => setInputs({ ...inputs, address: e.target.value })} required />
                                <button type='submit'>{submitLoading ?
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