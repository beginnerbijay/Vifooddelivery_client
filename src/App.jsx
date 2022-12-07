import { } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { Menucontext } from './context/context'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [val, setval] = useState('')
  return (
    <>
    <Menucontext.Provider value={{setval,val}}>
        <BrowserRouter>
          <Routes>
            <Route path='*' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
        </BrowserRouter>
            </Menucontext.Provider>
    </>
  )
}

export default App
