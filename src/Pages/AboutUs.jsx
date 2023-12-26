import React from 'react'
import About from '../components/aboutUs/About'
import OurJourney from '../components/aboutUs/OurJourney'
import OurFactory from '../components/aboutUs/OurFactory'
import Infrastructure from '../components/aboutUs/Infrastructure'
import Showroom from '../components/aboutUs/Showroom'

export default function AboutUs() {
    return (
        <div style={{backgroundColor:"#F5F5F5"}}>
            <About />
            <OurJourney />
            <OurFactory/>
            <Infrastructure/>
            <Showroom/>
        </div>
    )
}
