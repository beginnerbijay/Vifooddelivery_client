import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import Container from "react-bootstrap/esm/Container";
import Table from "react-bootstrap/esm/Table";
import { host } from "../../utils/host";
import { PencilSquare, XCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { error, success } from "../../utils/toastdata";
import { ToastContainer } from "react-toastify";
import LoadingPage from "../LoadingPage";

function AllMenus() {
  const nav = useNavigate();
  const [Menu, setMenu] = useState([]);
  const [loading, setloading] = useState(true)
  const user = localStorage.getItem("user")
  const deletemenu = async (id) => {
    const { data } = await axios.delete(`${host}/menu/deletemenu/${id}`,{
      headers:{"x-auth-token":JSON.parse(user).token},
    });
    if (data) {
      error("menu deleted");
    } else {
      warning("something went worng");
    }
  };
  useEffect(() => {
    const menu = async () => {
      const { data } = await axios.get(`${host}/menu`,{
        headers:{"x-auth-token":JSON.parse(user).token},
      });
      if (data) {
        setMenu(data);
        setloading(false)
      } else {
        error("something went worng");
      }
    };
    menu();
  }, []);
  return (
    <>{!loading?
    <Container className="menu_table">
      <Table bordered hover responsive striped className="align-middle mt-4">
        <thead>
          <tr>
            <th>Product</th>
            <th>Name</th>
            <th>Catogory</th>
            <th>Ratings</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {Menu.map((item, ind) => {
            return (
              <tr key={ind}>
                <td>
                  <img src={item.imgSrc} className="allmenu_img shadow" />
                </td>
                <td>{item.name}</td>
                <td>{item.itemId}</td>
                <td>{item.ratings}</td>
                <td>{item.price}</td>
                <td>
                  <PencilSquare
                    size={24}
                    onClick={() => nav(`/admin/editmenu/${item._id}`)}
                  />
                  <XCircle
                    size={24}
                    className="delete_btn"
                    onClick={() => deletemenu(item._id)}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
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
    </Container>:
          <LoadingPage/>
    }</>
  );
}

export default AllMenus;
