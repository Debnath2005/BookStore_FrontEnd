import React from 'react'
import Header from '../Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from '../Footer/Footer'
import './Dashboard.scss'

const Dashboard = () => {
  return (
    <div className='dashboard-cnt'>
        {/* <span>dsfkmdfsdgfngfnklgfnklgfnklgfnklgfnkldgf</span> */}
        <Header/>
          <Outlet/>
        <Footer/>
    </div>
  )
}

export default Dashboard