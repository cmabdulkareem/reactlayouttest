import React,{useContext} from 'react'
import UserLayout from './layouts/UserLayout'
import AdminLayout from './layouts/AdminLayout'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Login from './pages/Login'
import AdminLogin from './pages/AdminLogin'
import Register from './pages/Register'
import AdminRoutes from './pages/AdminRoutes'
import UserRoutes from './pages/UserRoutes'
import Cart from './pages/Cart'
import MyOrders from './pages/MyOrders'
import Product from './pages/adminPages/Products'
import Orders from './pages/adminPages/Orders'
import AddProducts from './pages/adminPages/AddProducts'
import Dashboard from './pages/adminPages/Dashboard'
import ItemDetailed from './pages/ItemDetailed'
import A from './components/A'

function App() {

  return (
    <div>
      <Routes>
        <Route path='/' element={<UserLayout />}>
          <Route index element={<HomePage />} />
          <Route path='cart' element={<UserRoutes><Cart /></UserRoutes>} />
          <Route path='myorders' element={<UserRoutes><MyOrders /></UserRoutes>} />
          <Route path='item/:id' element={<ItemDetailed />} />
        </Route>

        <Route path='/admin' element={<AdminLayout />}>
          <Route index element={<AdminRoutes><Dashboard /></AdminRoutes>} />
          <Route path='products' element={<AdminRoutes><Product /></AdminRoutes>} />
          <Route path='orders' element={<AdminRoutes><Orders /></AdminRoutes>} />
          <Route path='addproducts' element={<AdminRoutes><AddProducts /></AdminRoutes>} />
        </Route>

        <Route path='/login' element={<Login />} />
        <Route path='/admin/login' element={<AdminLogin />} />
        <Route path='/register' element={<Register />} />

        <Route path='/test' element={<A />} />
      </Routes>
    </div>
  )
}

export default App
