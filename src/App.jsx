import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import './App.css'
import Dashboard from './pages/Dashboard';
import CreateStore from './pages/CreateStore';
import ProtectedRoute from './components/ProtectedRoute';
import Store from './pages/Store';
import Notfound from './components/Notfound';
import AddProduct from './pages/AddProduct';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/404' element={<Notfound />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/store/:storeUsername' element={<Store />}></Route>
          <Route path="/store/:storeUsername/product/:productId" element={<ProductDetails />}
          />
          <Route path='/store/:storeUsername/cart' element={<Cart />}></Route>


          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/create-store' element={<CreateStore />}></Route>
            <Route path='/add-product' element={<AddProduct />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
