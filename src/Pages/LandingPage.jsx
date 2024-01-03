import React from 'react'
import Carousel from '../components/landingPage/Carousel'
import Carousel2 from '../components/landingPage/Carousel2'
import JourneyVision from '../components/landingPage/JourneyVision'
import Mission from '../components/landingPage/Mission'
import ManufactureDesigning from '../components/landingPage/ManufactureDesigning'
import Commitment from '../components/landingPage/Commitment'
import Uniqueness from '../components/landingPage/Uniqueness'
import Practice from '../components/landingPage/Practice'
import Process from '../components/landingPage/Process'
import Certification from '../components/landingPage/Certification'
import CustomBannerBtn from '../components/landingPage/CustomBannerBtn'

export default function LandingPage() {
    return (
        <>
            <Carousel />
            {/* <CustomBannerBtn /> */}
            <Carousel2 />
            <JourneyVision />
            <Mission />
            <ManufactureDesigning />
            <Commitment />
            <Uniqueness />
            <Practice />
            <Process />
            <Certification />
        </>
    )
}
