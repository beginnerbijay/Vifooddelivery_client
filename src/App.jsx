import { } from 'react'
import './App.css'
import {BrowserRouter,Routes,Route, HashRouter} from 'react-router-dom'
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
        <HashRouter>
          <Routes>
            <Route path='*' element={<Home/>}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/signup' element={<Signup/>}/>
          </Routes>
        </HashRouter>
            </Menucontext.Provider>
    </>
  )
}

export default App
