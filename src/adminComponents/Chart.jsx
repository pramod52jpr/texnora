import React, { useEffect, useState } from 'react'
import '../adminCss/chart.css'
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

export default function Chart() {
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
    useEffect(() => {
        fetchAllCustomReq();
        fetchAllQuotes();
    }, []);
    return (
        <>
            <div className="dashboardHeader">
                <div className="content">
                    <h1>Hello Admin !</h1>
                    <p>Welcome to TexNora Admin Dashboard</p>
                </div>
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
