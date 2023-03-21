import React from 'react'
import SideBar from './SideBar'
import './dashboard.css'
import {Outlet } from 'react-router-dom'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  ArcElement,
  Legend
);

const Dashboard = () => {

 
  
  return (
    <>
      <div className="dashboard">
        <SideBar />
        <Outlet/>
      </div>
    </>
  )
}

export default Dashboard