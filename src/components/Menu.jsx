import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";
import { useDispatch, useSelector } from "react-redux";
import { Menucontext } from "../context/context";
import { addToCart } from "../store/cart";
import { host } from "../utils/host";
import StarRating from "./StarRating";
import { success } from "../utils/toastdata";
import { ToastContainer } from "react-toastify";
import LoadingPage from './LoadingPage'

function Menu({ id }) {
  const dispatch = useDispatch();
  const { val } = useContext(Menucontext);
  const cart = useSelector((state) => state.cart);
  const [show, setShow] = useState(true);
  const [Items, setItems] = useState([]);
  const [loading, setloading] = useState(true)
  const user = localStorage.getItem("user")
  const result = () => {
    return Items.filter((menus) => {
      return menus.itemId.includes(id);
    });
  };
  const search = () => {
    return Items.filter((vals) => {
      return vals.itemId.toLowerCase().includes(val);
    });
  };

  useEffect(
    () => {
      const cartdata = JSON.stringify(cart);
      localStorage.setItem("cartdata", cartdata);
    },
    [cart],
    []
  );
  useEffect(() => {
    setShow(false);
    search();
  }, [val]);
  useEffect(() => {
    setShow(true);
    result();
  }, [id]);
  useEffect(() => {
    result();
  }, []);
  useEffect(() => {
    const menu = async () => {
      const { data } = await axios.get(`${host}/menu`,{
        headers:{"x-auth-token":JSON.parse(user).token},
      });
      if (data) {
        setItems(data);
        setloading(false)
      }
    };
    menu();
  }, []);

  return (
    <>{!loading?
    <Container className="mt-5">
      <Stack className="menu_card" direction="horizontal">
        {show
          ? result().map((val, ind) => {
              return (
                <div key={ind} className="menu_container shadow">
                  <Stack direction="horizontal" className="menu_subcontainer">
                    {val.name.includes("Chicken" || "Mutton") ? (
                      <img
                        src="https://static.magicpin.com/samara/static/images/merchant/magicOrder/non-veg-icon.svg"
                        className="menu_icon"
                      ></img>
                    ) : (
                      <img
                        src="https://static.magicpin.com/samara/static/images/merchant/magicOrder/veg-icon.svg"
                        className="menu_icon"
                      ></img>
                    )}
                    <Stack className="menu_details">
                      <span className="text">{val.name}</span>
                      <StarRating ratings={val.ratings} />
                      <span className="text">&#8377; {val.price}</span>
                    </Stack>
                  </Stack>
                  <Stack className="img_container">
                    <img
                      className="d-block menu_img shadow"
                      src={val.imgSrc}
                      alt="First slide"
                    />
                    <Button
                      type="submit"
                      style={{
                        width: "8vw",
                        backgroundColor: "#b01707",
                        border: "none",
                        color: "#fff",
                      }}
                      className="cart_btn"
                      id="liveToastBtn"
                      onClick={() => {
                        dispatch(addToCart(val));
                        success("Added To Cart");
                      }}
                    >
                      Add To Cart
                    </Button>
                  </Stack>
                </div>
              );
            })
          : search().map((val, ind) => {
              return (
                <div key={ind} className="menu_container shadow">
                  <Stack direction="horizontal" className="menu_subcontainer">
                    {val.name.includes("Chicken" || "Mutton") ? (
                      <img
                        src="https://static.magicpin.com/samara/static/images/merchant/magicOrder/non-veg-icon.svg"
                        className="menu_icon"
                      ></img>
                    ) : (
                      <img
                        src="https://static.magicpin.com/samara/static/images/merchant/magicOrder/veg-icon.svg"
                        className="menu_icon"
                      ></img>
                    )}
                    <Stack className="menu_details">
                      <span className="text">{val.name}</span>
                      <StarRating ratings={val.ratings} />
                      <span className="text">{val.price}</span>
                    </Stack>
                  </Stack>
                  <Stack className="img_container">
                    <img
                      className="d-block menu_img shadow"
                      src={val.imgSrc}
                      alt="First slide"
                    />
                    <Button
                      type="submit"
                      style={{
                        width: "8vw",
                        backgroundColor: "#b01707",
                        border: "none",
                        color: "#fff",
                      }}
                      className="cart_btn"
                      onClick={() => {
                        dispatch(addToCart(val));
                        success("Added To Cart");
                      }}
                    >
                      Add To Cart
                    </Button>
                  </Stack>
                </div>
              );
            })}
      </Stack>
      <ToastContainer
        position="bottom-center"
        autoClose={1000}
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

export default Menu;
