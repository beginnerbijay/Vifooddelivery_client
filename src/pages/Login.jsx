import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Stack from "react-bootstrap/esm/Stack";
import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { host } from "../utils/host";
import { error, success, warning } from "../utils/toastdata";
import { ToastContainer } from "react-toastify";

function Login() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const nav = useNavigate();

  const handler = async (e) => {
    e.preventDefault();
    if (username && password) {
      const { data } = await axios.post(`${host}/user/login`, {
        username,
        password,
      });
      if (data) {
        if (data == "password did not match") {
          error("password did not match");
        } else {
          success("User Login Success");
          localStorage.setItem("user", JSON.stringify(data));
          nav("/");
        }
      } else {
        error("Invalid User");
        nav("/login");
      }
    } else {
      warning("All Fields Required");
    }
  };
  return (
    <Container fluid style={{ backgroundColor: "#f5f2ea" }}>
      <Stack
        className="col-md-5 mx-auto"
        style={{
          height: "100vh",
          width: "25vw",
          minWidth: "300px",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            height: "65vh",
            backgroundColor: "#fff",
            borderRadius: "20px",
          }}
          className="shadow"
        >
          <Form
            style={{ textAlign: "start", marginTop: "5rem" }}
            onSubmit={handler}
          >
            <Form.Group className="mb-2" controlId="formBasicEmail">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                className="mx-auto"
                value={username}
                onChange={(e) => setusername(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                className="mx-auto"
                value={password}
                onChange={(e) => setpassword(e.target.value)}
              />
            </Form.Group>
            <Stack>
              <Button
                type="submit"
                style={{
                  minWidth: "220px",
                  width: "19vw",
                  backgroundColor: "#fcc986",
                  border: "none",
                  color: "#000",
                }}
                className="mx-auto"
              >
                Log In
              </Button>
              <Stack style={{ flexDirection: "row" }} className="mx-auto mt-5">
                <span>Don't Have An Account?</span>
                <NavLink to="/signup">Sign Up</NavLink>
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

export default Login;
