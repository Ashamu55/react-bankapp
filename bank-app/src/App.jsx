import './App.css'
import { Navigate, Route, Routes } from "react-router-dom"
import Signup from './Components/Signup'
import Sigin from './Components/Sigin'
import Home from './Components/Home'
import Dashboard from './Components/Dashboard'

function App() {

  return (
    <>
    < Routes>
    <Route path="/home" element={<Home />} />
    <Route path="/signup" element={<Signup />} />
    <Route path="/sigin" element={<Sigin />} />
    <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
    </>
  )
}

export default App
