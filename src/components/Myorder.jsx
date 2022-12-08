import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cartTotalPriceSelector } from "../store/selector";
import { host } from "../utils/host";
import axios from "axios";
import { clear } from "../store/cart";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";
import { DynaminBar } from "./DProgressBar";
import { error, success, warning } from "../utils/toastdata";
import { ToastContainer } from "react-toastify";
import LoadingPage from "./LoadingPage";

function Myorder() {
  const nav = useNavigate();
  const totalPrice = useSelector(cartTotalPriceSelector);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [searchParams,setSearchParams] = useSearchParams()
  const [items, setitems] = useState([]);
  const [loading, setloading] = useState(true);
  const orders = async () => {
    try {
      const user = localStorage.getItem("user")
      const { data } = await axios.get(`${host}/myorders/${id}`,{
        headers:{"x-auth-token":JSON.parse(user).token},
      });
      if (data) {
        setitems(data);
        setloading(false)
      } else {
        warning("No Order History");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const resolve = async () => {
      try {
        let query = searchParams.get("success")
        if (query == "true") {
          const user = localStorage.getItem("user");
          const cart = localStorage.getItem("cartdata");
          const address = localStorage.getItem("address");
          const { data } = await axios.post(`${host}/neworder`, {
            user,
            cart,
            address,
            totalPrice,
          },{
            headers:{"x-auth-token":JSON.parse(user).token},
          });
          if (data) {
            success("Your Order Is Preparing");
            dispatch(clear());
            localStorage.removeItem("cartdata");
            nav(`/myorder/${id}`);
          } else {
            error("something went worng");
          }
        }
        orders();
      } catch (e) {
        console.log(e);
      }
    };
    resolve();
  }, []);
  const convertdate = (e) => {
    const date = new Date(e);
    return date.toLocaleString();
  };

  return (
    <>
      {!loading?
      <><Stack className="blur"></Stack>
      <Container className="orderlist">
        <Stack className="orderlist_header">
          <h1>My Orders</h1>
          <h3>Total({items.length})</h3>
        </Stack>
        <Row xs={1} md={3} className="g-4 card_box">
          {items.map((val, ind) => {
            return (
              <Col key={ind}>
                <Card
                  style={{ border: "1px solid #ffc107" }}
                  className="shadow bg-transparent"
                >
                  <Card.Header
                    style={{ border: "1px solid #ffc107", fontSize: "1.5rem",maxHeight : "5.5rem",overflow: "hidden" }}
                  >
                    <strong>Order Id</strong> : {val._id}
                  </Card.Header>
                  <Card.Body>
                    <Card.Title>Total Amout : &#8377; {val.totalPrice}</Card.Title>
                    <Card.Text>
                      <span style={{ fontSize: "1.5rem" }}>Items :</span>
                      <br />
                      {val.orderitems?.map((item, index) => {
                        return (
                          <span key={index}>
                            {item.quantity}*{`${item.name}`}&nbsp;&nbsp;{" "}
                          </span>
                        );
                      })}
                    </Card.Text>
                    <Card.Title>
                      Address :
                      <address>
                        <h6>
                          {val.shippingAddress?.lane},
                          {val.shippingAddress?.city},
                          {val.shippingAddress?.state},
                          {val.shippingAddress?.pin}
                        </h6>
                      </address>
                    </Card.Title>
                    <Card.Title>
                      Ordered At : <h6>{convertdate(val.time)}</h6>
                    </Card.Title>
                    <Card.Title style={{marginTop: "1rem"}}>
                      Status :{" "}
                      {val.isDelivered ? (
                        <DynaminBar transfer={"delivered"} />
                      ) : val.isWay ? (
                        <DynaminBar transfer={"way"} />
                      ) : (
                        <DynaminBar transfer={"dish"} />
                      )}
                    </Card.Title>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
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
      </>:<LoadingPage/>}
    </>
  );
}

export default Myorder;
