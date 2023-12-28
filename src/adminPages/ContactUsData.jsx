import React, { useEffect, useState } from 'react'
import '../adminCss/contactDatas.css'
import Header from '../adminComponents/Header';
import ReactLoading from 'react-loading';

export default function ContactUsData() {
    const [loading, setLoading] = useState(false);
    const [allContactData, setAllContactData] = useState([]);

    async function fetchContactData() {
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const contactApi = process.env.REACT_APP_CONTACT_API;
        await fetch(contactApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setAllContactData(res.data);
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
    }

    useEffect(() => {
        fetchContactData();
    }, []);
  return (
    <>
            <Header title={"Contact Us Data"} />
            <div className="contactDatas">
                <table>
                    <thead>
                        <tr>
                            <th>Date</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Message</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            loading ? <tr align="center"><td style={{ height: "300px" }} colSpan={500}>
                                <ReactLoading type='spokes' height={50} width={50} color='green' />
                            </td></tr>
                                : allContactData.map(element => <tr key={element.id}>
                                    <td>{element.date}</td>
                                    <td>{element.name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.message}</td>
                                </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </>
  )
}
