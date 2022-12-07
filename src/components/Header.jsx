import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { PersonCheck, Cart, Search, BoxArrowRight } from "react-bootstrap-icons";
import { useContext, useEffect } from "react";
import { Menucontext } from "../context/context";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { cartTotalSelector } from "../store/selector";
import Badge from "react-bootstrap/Badge";

function Header() {
  const nav = useNavigate();
  const { setval } = useContext(Menucontext);
  const [search, setsearch] = useState("");
  const [id, setid] = useState("");
  const [isAdmin, setisAdmin] = useState(false);
  const total = useSelector(cartTotalSelector);
  const handler = (e) => {
    e.preventDefault();
    setval(search);
  };
  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("user");
    localStorage.removeItem("cartdata");
    localStorage.removeItem("address");
    nav("/login");
  };
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      const _id = user._id;
      setisAdmin(user.isAdmin);
      setid(_id);
    }
  }, []);

  return (
    <>
      {["sm"].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} sticky="top">
          <Container fluid>
            <Navbar.Brand>
              <Link to="/">
                <img
                  src="https://img.freepik.com/free-vector/vector-poster-with-cartoon-burger-illustration-text-quote-chill-grill_250435-1417.jpg?w=740&t=st=1669046241~exp=1669046841~hmac=90e4125b455b8b3f4be2962bcf68a0490af9974de0fcfdf2253af31d5fdc1549"
                  width="auto"
                  height="36"
                  className="d-inline-block align-top brand_image"
                  alt="React Bootstrap logo"
                />{" "}
                ViFood App
              </Link>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Offcanvas
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {!isAdmin ? (
                  <>
                    <Nav className="us_header_bar flex-grow-1 ">
                      <Form
                        className="d-flex"
                        onSubmit={handler}
                        style={{ height: "2.5rem" }}
                      >
                        <Search size={18} className="search_icon" />
                        <Form.Control
                          type="search"
                          placeholder="Search"
                          className="me-2 search_bar"
                          aria-label="Search"
                          onChange={(e) => setsearch(e.target.value)}
                          value={search}
                        />
                      </Form>
                      <Link to="/checkout">
                        <Cart size={24} style={{ position: "relative" }} /><span className="hide"> My Cart</span>
                        {total ? (
                          <Badge
                            bg="warning"
                            text="dark"
                            pill
                            style={{
                              position: "absolute",
                              top: "-8px",
                              left: "10px",
                            }}
                          >
                            {total}
                          </Badge>
                        ) : (
                          ""
                        )}
                      </Link>
                          <Link to={`/myorder/${id ? id : ""}`}><PersonCheck size={24} /><span className="hide"> My Orders</span></Link>
                        <div onClick={logout}><BoxArrowRight size={24} /><span className="hide"> Logout</span></div>
                    </Nav>
                  </>
                ) : (
                  <Nav className="ad_header_bar flex-grow-1">
                    <Link to="/admin/allmenus">
                      <Button variant="outline-secondary" className="ad_header_btn">
                        All Menus
                      </Button>
                    </Link>
                    <Link to="/admin/addmenu">
                      <Button variant="outline-primary" className="ad_header_btn">
                        Add Menu
                      </Button>
                    </Link>
                    <Link to="/admin">
                      <Button variant="outline-warning" className="ad_header_btn">
                        All Orders
                      </Button>
                    </Link>
                    <Button
                      variant="outline-danger"
                      className="ad_header_btn"
                      onClick={logout}
                    >
                      Log Out
                    </Button>
                  </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;
