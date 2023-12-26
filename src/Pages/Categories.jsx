import React, { useEffect, useState } from 'react'
import '../css/categories.css'
import { Link } from 'react-router-dom'
import ReactLoading from 'react-loading';

export default function Categories() {
    const imgBaseUrl = process.env.REACT_APP_BASE_URL;
    const [loading, setLoading] = useState(true);
    const [catData, setCatData] = useState([]);
    async function fetchCategories() {
        const token = process.env.REACT_APP_TOKEN;
        const url = process.env.REACT_APP_CAT_API;
        await fetch(url, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setCatData(res.data);
            setLoading(false);
        }).catch((e) => {
            console.log("the error is : " + e);
        });
    }

    useEffect(() => {
        fetchCategories();
    }, []);
    return (
        <>
            <div className="categories">
                <h1>All Collections</h1>
                <div className="items">
                    {
                        loading ? <div style={{ height: "300px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center" }}>
                            <ReactLoading type='spokes' height={50} width={50} color='green' />
                        </div> :
                            catData.map(element => <Link to={`/products/${element.id}`} className="item" key={element.id}>
                                <div className="image" style={{ backgroundImage: `url('${imgBaseUrl}/storage/categoryimages/${element.image}')` }}></div>
                                <h2>{element.name}</h2>
                            </Link>
                            )
                    }
                </div>
            </div>
        </>
    )
}
