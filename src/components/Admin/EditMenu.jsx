import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import axios from "axios";
import { host } from "../../utils/host";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { error, success, warning } from "../../utils/toastdata";
import { ToastContainer } from "react-toastify";

function EditMenu() {
  const { id } = useParams();
  const nav = useNavigate();
  const [name, setname] = useState("");
  const [imgSrc, setimgSrc] = useState("");
  const [ratings, setratings] = useState("");
  const [itemId, setitemId] = useState("");
  const [price, setprice] = useState("");
  const user = localStorage.getItem("user")
  const editmenu = async (e) => {
    try {
      e.preventDefault();
      if (itemId && imgSrc && name && ratings && price) {
        const { data } = await axios.patch(`${host}/menu/editmenu/${id}`, {
          itemId,
          imgSrc,
          name,
          ratings,
          price,
        },{
          headers:{"x-auth-token":JSON.parse(user).token},
        });
        if (data) {
          success("menu edit success");
          nav("/admin/allmenus");
        } else {
          error("something went worng");
        }
      } else {
        warning("all fields required");
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    const menu = async () => {
      try {
        const { data } = await axios.get(`${host}/menu/singlemenu/${id}`,{
          headers:{"x-auth-token":JSON.parse(user).token},
        });
        if (data) {
          setname(data.name);
          setimgSrc(data.imgSrc);
          setratings(data.ratings);
          setitemId(data.itemId);
          setprice(data.price);
        }
      } catch (e) {
        console.log(e);
      }
    };
    menu();
  }, []);
  return (
    <Container className="addmenu_box">
      <Form className="mb-5" onSubmit={editmenu}>
        <Form.Group className="mb-3" controlId="formGridAddress1">
          <Form.Label>Menu Name</Form.Label>
          <Form.Control
            value={name}
            onChange={(e) => setname(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGridAddress2">
          <Form.Label>Image URL</Form.Label>
          <Form.Control
            value={imgSrc}
            onChange={(e) => setimgSrc(e.target.value)}
          />
        </Form.Group>

        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridRating">
            <Form.Label>Ratings</Form.Label>
            <Form.Control
              value={ratings}
              onChange={(e) => setratings(e.target.value)}
            />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridState">
            <Form.Label>itemId</Form.Label>
            <Form.Select
              value={itemId}
              onChange={(e) => setitemId(e.target.value)}
            >
              <option>burger</option>
              <option>pizza</option>
              <option>hotdog</option>
              <option>snack</option>
              <option>drink</option>
              <option>taco</option>
              <option>noddles</option>
              <option>biriyani</option>
              <option>others</option>
            </Form.Select>
          </Form.Group>

          <Form.Group as={Col} controlId="formGridZip">
            <Form.Label>Price</Form.Label>
            <Form.Control
              value={price}
              onChange={(e) => setprice(e.target.value)}
            />
          </Form.Group>
        </Row>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>
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

export default EditMenu;
