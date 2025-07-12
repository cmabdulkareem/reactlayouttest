import React from 'react'
import AdminHeader from '../partials/AdminHeader'
import Footer from '../partials/Footer'
import { Outlet } from 'react-router-dom'

function AdminLayout() {
  return (
    <div>
     <AdminHeader />   
     <Outlet />
     <Footer />
    </div>
  )
}

export default AdminLayout
