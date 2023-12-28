import React from 'react'
import Header from '../adminComponents/Header'
import RecentActivities from '../adminComponents/RecentActivities'
import Chart from '../adminComponents/Chart'

export default function Dashboard() {
    return (
        <>
            <Header />
            <Chart />
            <RecentActivities />
        </>
    )
}
