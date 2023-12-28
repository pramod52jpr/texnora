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
import QuoteDatas from '../adminPages/QuoteDatas';
import CustomRequirements from '../adminPages/CustomRequirements';
import ContactUsData from '../adminPages/ContactUsData';
import UsersData from '../adminPages/UsersData';
import SliderImage from '../adminPages/SliderImage';
import LoginSession from './LoginSession';
import ScrollAnimation from './ScrollAnimation';

export default function AllRoutes() {

    const location = useLocation();
    const hideHeaderFooterPaths = ["/admin", "/dashboard", "/admin-categories", "/admin-products", "/admin-quote-datas", "/admin-custom-requirements", "/admin-contact-us-data", "/admin-data", "/admin-slider-image"];
    return (
        <>
            {hideHeaderFooterPaths.includes(location.pathname) || <Header />}
            {!hideHeaderFooterPaths.includes(location.pathname) || <LoginSession />}
            <ScrollAnimation />
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
                <Route path='/admin-quote-datas' Component={QuoteDatas} />
                <Route path='/admin-custom-requirements' Component={CustomRequirements} />
                <Route path='/admin-contact-us-data' Component={ContactUsData} />
                <Route path='/admin-data' Component={UsersData} />
                <Route path='/admin-slider-image' Component={SliderImage} />
            </Routes>
            {hideHeaderFooterPaths.includes(location.pathname) || <Footer />}
        </>
    )
}
