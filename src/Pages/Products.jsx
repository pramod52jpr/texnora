import React, { useEffect, useState } from 'react'
import ProductsBg from '../components/products/ProductsBg'
import Product from '../components/products/Product'
import { useParams } from 'react-router-dom'

export default function Products() {
    const params = useParams();
    const [loading, setLoading] = useState(true);
    const [productsData, setProductsData] = useState([]);

    async function fetchProducts(){
        setLoading(true);
        const token = process.env.REACT_APP_TOKEN;
        const proApi = process.env.REACT_APP_PRODUCT_API;
        await fetch(proApi, {
            headers: { token }
        }).then(res => res.json()).then((res) => {
            setLoading(false);
            setProductsData(res.data.filter(e=>e.cid===parseInt(params.cid)));
        }).catch((e) => {
            setLoading(false);
            console.log("the error is " + e);
        });
    }
    useEffect(()=>{
        fetchProducts();
    },[]);
    return (
        <>
            <ProductsBg loading={loading} productsData={productsData} />
            <Product loading={loading} productsData={productsData} />
        </>
    )
}
