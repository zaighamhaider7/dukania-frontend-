import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Register  from "./pages/Register";
import './App.css'

function App() {

  return (
    <>
      <BrowserRouter>
       <Routes>
         <Route path="/register" element={<Register/>}></Route>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
