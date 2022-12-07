import { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { host } from '../../utils/host'
import { warning, success } from "../../utils/toastdata";
import { ToastContainer } from "react-toastify";

function AddMenu() {
  const [name, setname] = useState("");
  const [imgSrc, setimgSrc] = useState("");
  const [ratings, setratings] = useState("");
  const [itemId, setitemId] = useState("");
  const [price, setprice] = useState("");
  const user = localStorage.getItem("user")
  const newmenu = async(e) => {
    try{
      e.preventDefault()
      const unique_id = uuid();
      const small_id = unique_id.slice(0, 8);
      if(small_id && itemId && imgSrc && name && ratings && price){
        const { data } = await axios.post(`${host}/menu/addmenu`, {
          small_id,
          itemId,
          imgSrc,
          name,
          ratings,
          price,
        },{
          headers:{"x-auth-token":JSON.parse(user).token},
        });
        if (data) {
          success("menu added")
          setname("")
          setimgSrc("")
          setratings("")
          setitemId("")
          setprice("")
        }else{
          warning("something went worng")
        }
      }else{
        warning("all fields must be filled")
      }
    }catch(e){
      console.log(e)
    }
  };
  return (
    <Container className="addmenu_box">
      <Form className="mb-5" onSubmit={newmenu}>
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
              <option>noodles</option>
              <option>biryani</option>
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

export default AddMenu;
