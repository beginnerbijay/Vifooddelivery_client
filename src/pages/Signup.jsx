import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/esm/Container';
import Form from 'react-bootstrap/Form';
import Stack from 'react-bootstrap/esm/Stack';
import { NavLink, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import { host } from '../utils/host';
import { error, success, warning } from "../utils/toastdata";
import { ToastContainer } from "react-toastify";


function Signup() {
    const [username, setusername] = useState('')
    const [email, setemail] = useState('')
    const [contact, setcontact] = useState('')
    const [password, setpassword] = useState('')
    const [show, setshow] = useState(true)
    const nav = useNavigate()
    const handler=async(e)=>{
        e.preventDefault()
        if(username && email && contact && password){
          const {data} = await axios.post(`${host}/user/registration`,{username,email,contact,password})
          if(data){
            setshow(false)
            success("User Registration Success","success")
            nav('/login')
          }else{
            error("User Registration Failed","danger")
          }
        }else{
          warning("You should check in on some of those fields below.");
        }
    }
  return (
    <Container fluid style={{backgroundColor:"#f5f2ea"}}>
    <Stack className="col-md-5 mx-auto" style={{height:"100vh",width:"25vw",minWidth:"300px",justifyContent:"center"}}>
    <div style={{height:"65vh",backgroundColor:"#fff",borderRadius:"20px"}} className='shadow'>
    <Form style={{textAlign:"start"}} onSubmit={handler}>
      <Form.Group className="mb-2 mt-4" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control type="text" placeholder="Enter username" className='mx-auto' value={username} onChange={e=>setusername(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email id" className='mx-auto' value={email} onChange={e=>setemail(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-2" controlId="formBasicContact">
        <Form.Label>Contact</Form.Label>
        <Form.Control type="number" placeholder="Enter contact" className='mx-auto' value={contact} onChange={e=>setcontact(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Enter Password" className='mx-auto' value={password} onChange={e=>setpassword(e.target.value)}/>
      </Form.Group>
      <Stack>
      <Button disabled={!show} type="submit" style={{minWidth:"220px",width:"19vw",backgroundColor:"#fcc986",border:"none",color:"#000"}} className='mx-auto'>
        Sign Up
      </Button>
      <Stack style={{flexDirection:"row"}} className='mx-auto mt-3'>
        <span >Already Have An Account?</span>
        <NavLink to='/login'>Log In</NavLink>
      </Stack>
      </Stack>
    </Form>
    </div>
    </Stack>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
}

export default Signup;