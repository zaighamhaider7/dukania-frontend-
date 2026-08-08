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

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route index element={<Home />}></Route>
          <Route path='/register' element={<Register />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/store/:storeUsername' element={<Store />}></Route>

          <Route element={<ProtectedRoute />}>
            <Route path='/dashboard' element={<Dashboard />}></Route>
            <Route path='/create-store' element={<CreateStore />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
