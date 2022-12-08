import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import Button from 'react-bootstrap/esm/Button'
import Container from 'react-bootstrap/esm/Container'
import Table from 'react-bootstrap/esm/Table'
import { host } from '../../utils/host'
import LoadingPage from '../LoadingPage'

function AllOrders() {
  const [items, setitems] = useState([])
  const [loading, setloading] = useState(true)
  const user = localStorage.getItem("user")
  useEffect(()=>{
    const orders =async()=>{
      const {data} = await axios.get(`${host}/allorders`,{
        headers:{"x-auth-token":JSON.parse(user).token},
      })
      if(data){
        setitems(data)
        setloading(false)
      }
    }
    orders()
  },[])
  const convertdate=(e)=>{
    const date = new Date(e)
    return (date.toLocaleString())
  }
  const deliver=async(id)=>{
    const {data} = await axios.post(`${host}/deliver/${id}`,{},{
      headers:{"x-auth-token":JSON.parse(user).token},
    })
    if(data){
      window.location.href = '/#/admin'
    }
  }
  return (
    <>{!loading?
    <Container className='order_table'>
      <Table bordered hover responsive>
      <thead>
        <tr>
          <th>Order Id</th>
          <th>Items</th>
          <th>User Id</th>
          <th>Amount</th>
          <th>Order Time</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {items.map((item,ind)=>{
          return (
            <tr key={ind}>
              <td>{item._id}</td>
              <td>{item.orderitems?.map((val,index)=>{
                  return (
                    <span key={index}>{val.quantity}*{`${val.name}`}&nbsp;&nbsp;</span>
                  )
                })}</td>
              <td>{item.userid}</td>
              <td>{item.totalPrice}</td>
              <td>{convertdate(item.time)}</td>
              <td>{item.isDelivered?"divered":<Button onClick={()=>deliver(item._id)}>{item.isWay?"Deliver":"Dispatch"}</Button>}</td>
            </tr>
          )
        })}
      </tbody>
    </Table>
    </Container>:
        <LoadingPage/>
    }</>
  )
}

export default AllOrders