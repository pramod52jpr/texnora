import React from 'react'
import { Route, Routes, useLocation } from 'react-router-dom';
import LandingPage from './LandingPage';
import Header from '../components/Header';
import Categories from './Categories';
import Contact from './Contact';
import AboutUs from './AboutUs';
import Footer from '../components/Footer';
import Products from './Products';
import ProductDetail from './ProductDetail';
import AdminPanel from '../adminPages/AdminPanel';
import Dashboard from '../adminPages/Dashboard';
import AdminCategories from '../adminPages/AdminCategories';
import AdminProducts from '../adminPages/AdminProducts';

export default function AllRoutes() {

    const location = useLocation();
    const hideHeaderFooterPaths = ["/admin","/dashboard","/admin-categories","/admin-products"];
    return (
        <>
            {hideHeaderFooterPaths.includes(location.pathname) || <Header />}
            <Routes>
                <Route path='/' Component={LandingPage} />
                <Route path='/contact-us' Component={Contact} />
                <Route path='/about-us' Component={AboutUs} />
                <Route path='/categories' Component={Categories} />
                <Route path='/products/:cid?' Component={Products} />
                <Route path='/product-details/:cid?/:pid?' Component={ProductDetail} />
                <Route path='/admin' Component={AdminPanel} />
                <Route path='/dashboard' Component={Dashboard} />
                <Route path='/admin-categories' Component={AdminCategories} />
                <Route path='/admin-products' Component={AdminProducts} />
            </Routes>
            {hideHeaderFooterPaths.includes(location.pathname) || <Footer />}
        </>
    )
}
