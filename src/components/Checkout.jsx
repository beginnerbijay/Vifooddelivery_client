import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/esm/Button";
import { Dash, Plus, XCircleFill } from "react-bootstrap-icons";
import { useDispatch, useSelector } from "react-redux";
import { clear, decrement, increament, remove } from "../store/cart";
import { cartTotalPriceSelector } from "../store/selector";
import Payment from "./Payment";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import Table from "react-bootstrap/Table";

function Checkout() {
  const dispatch = useDispatch();
  const cartitem = useSelector((state) => state.cart);
  const totalPrice = useSelector(cartTotalPriceSelector);
  const [cart, setcart] = useState([]);
  const [isInitialRender, setIsInitialRender] = useState(false);
  let nav = useNavigate();
  useEffect(() => {
    if (isInitialRender) {
      setIsInitialRender(false);
      const cartdata = localStorage.getItem("cartdata");
      const data = JSON.parse(cartdata);
      setcart(data);
    }
  }, [isInitialRender]);
  useEffect(() => {
    const data = JSON.stringify(cartitem);
    localStorage.setItem("cartdata", data);
    setIsInitialRender(true);
  }, [cartitem]);
  return (
    <Container>
      <Row className="checkout_box">
        <Col style={{ flex: "0.6" }}>
          <Table hover className="align-middle mt-4" responsive>
            <thead>
              <tr>
                <th>Menu</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>
                  <Button
                  className='clear'
                    style={{
                      backgroundColor: "#b01707",
                      border: "none",
                      color: "#fff",
                    }}
                    onClick={() => dispatch(clear())}
                  >
                    clear
                  </Button>
                </th>
              </tr>
            </thead>
            <tbody>
              {!isInitialRender &&
                cart?.map((val, ind) => {
                  return (
                    <tr key={ind} className="">
                      <td>
                        <img
                          className="d-block cart_img"
                          src={val.imgSrc}
                          alt="First slide"
                        />
                      </td>
                      <td>
                        {val.name.includes("Chicken" || "Mutton") ? (
                          <img
                            src="https://static.magicpin.com/samara/static/images/merchant/magicOrder/non-veg-icon.svg"
                            className="top"
                          ></img>
                        ) : (
                          <img
                            src="https://static.magicpin.com/samara/static/images/merchant/magicOrder/veg-icon.svg"
                            className="top"
                          ></img>
                        )}
                        <span className="text">{val.name}</span>
                      </td>
                      <td>
                        <div className="d-flex">
                          <Dash
                            size={24}
                            className={
                              val.quantity === 1 ? "disabled btn2" : "btn2"
                            }
                            onClick={() => dispatch(decrement(val))}
                          />
                          <span className="text2">{val.quantity}</span>
                          <Plus
                            size={24}
                            className="btn3"
                            onClick={() => dispatch(increament(val))}
                          />
                        </div>
                      </td>
                      <td>
                        <span className="text">&#8377; {val.price}</span>
                      </td>
                      <td>
                        <XCircleFill
                          style={{ color: "#b01707" }}
                          onClick={() => dispatch(remove(val))}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </Table>
          <Button
            style={{
              backgroundColor: "#b01707",
              border: "none",
              color: "#fff",
            }}
            onClick={() => nav(-1)}
          >
            Add More
          </Button>
        </Col>
        <Col style={{ flex: "0.4" }}>
          <Payment totalPrice={totalPrice} cart={cart} />
        </Col>
      </Row>
    </Container>
  );
}

export default Checkout;
