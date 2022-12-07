import React, { useState } from "react";
import Stack from "react-bootstrap/esm/Stack";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/Form";
import { host } from "../utils/host";
import axios from "axios";
import Col from "react-bootstrap/esm/Col";
import Row from "react-bootstrap/Row";
import { useEffect } from "react";
import { warning } from "../utils/toastdata";
import { ToastContainer } from "react-toastify";

function Payment({ totalPrice, cart }) {
  const [disable, setDisable] = useState(false);
  const [address, setAddress] = useState({
    lane: "",
    city: "",
    state: "",
    pin: "",
  });
  const handler = (e) => {
    e.preventDefault();
    if (address.lane && address.city && address.state && address.pin) {
      setDisable(true);
    } else {
      setDisable(false);
      warning("Delivery Address Required");
    }
  };
  const payment = async (e) => {
    e.preventDefault();
    const user = localStorage.getItem("user");
    if (cart != "[]") {
      if (address.lane && address.city && address.state && address.pin) {
        const { data } = await axios.post(`${host}/create-checkout-session`, {
          cart,
          user,
        });
        if (data) {
          window.location.href = data;
        }
      } else {
        warning("Delivery Address Required");
      }
    } else {
      warning("Atleast One Menu For Order");
    }
  };
  useEffect(() => {
    localStorage.setItem("address", JSON.stringify(address));
  }, [address]);
  return (
    <div className="payment_bar">
      <Stack>
        <Form className="address_form" onSubmit={handler}>
          <h5>Enter Delhivery Address</h5>
          <Form.Group className="mb-2" controlId="formGridAddress1">
            <Form.Label className="label">Address</Form.Label>
            <Form.Control
              className="address"
              value={address.lane}
              onChange={(e) => setAddress({ ...address, lane: e.target.value })}
            />
          </Form.Group>
          <Row className="mb-2">
            <Form.Group as={Col} controlId="formGridCity">
              <Form.Label className="label">City</Form.Label>
              <Form.Control
                className="address"
                value={address.city}
                onChange={(e) =>
                  setAddress({ ...address, city: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridState">
              <Form.Label className="label">State</Form.Label>
              <Form.Control
                className="address"
                value={address.state}
                onChange={(e) =>
                  setAddress({ ...address, state: e.target.value })
                }
              />
            </Form.Group>
            <Form.Group as={Col} controlId="formGridZip">
              <Form.Label className="label">Zip</Form.Label>
              <Form.Control
                className="address"
                value={address.pin}
                onChange={(e) =>
                  setAddress({ ...address, pin: e.target.value })
                }
              />
            </Form.Group>
          </Row>
          <Button
            type="submit"
            style={{
              backgroundColor: "#b01707",
              border: "none",
              color: "#fff",
            }}
          >
            Submit
          </Button>
        </Form>
      </Stack>
      <Stack className="mx-auto total_cart">
        <h3 className="mb-4 fw-light">Final ckeckout</h3>
        <span>SubTotal:{totalPrice}</span>
        <span>Discount:00</span>
        <span>Total:{totalPrice}</span>
        <Button
          disabled={!disable}
          style={{ backgroundColor: "#fff", color: "#000", marginTop: "1rem" }}
          onClick={payment}
        >
          Pay Now
        </Button>
      </Stack>
      <ToastContainer
        position="top-right"
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
    </div>
  );
}

export default Payment;
