import Container from "react-bootstrap/esm/Container";
import Stack from "react-bootstrap/esm/Stack";
import { MenuItems } from "../Data";
import { ChevronRight, ChevronLeft } from "react-bootstrap-icons";
import { useState } from "react";
import { useRef } from "react";
import Menu from "./Menu";

function CarouselSlide() {
  const [menu_id, setMenu_id] = useState("buger");
  const ref = useRef();
  const scroll = (scrollOffset) => {
    ref.current.scrollLeft += scrollOffset;
  };
  return (
    <Container className="bg-light col_container ">
      <Stack className="col-md-12 mx-auto text-center py-4">
        <h1>Inspiration for your first order</h1>
      </Stack>
      <Stack direction="horizontal" className="px-2">
        <div className="btn_container shadow">
          <ChevronLeft size={24} onClick={() => scroll(-212)} className='rbtn'/>
        </div>
        <Stack
          className="carousel col-md-11 mx-auto"
          direction="horizontal"
          ref={ref}
        >
          {MenuItems.map((val, ind) => {
            return (
              <div
                key={ind}
                onClick={() => setMenu_id(val.itemId)}
                className="img_col_container"
              >
                <img
                  className="d-block carousel_img"
                  src={val.imgSrc}
                  alt="First slide"
                />
                <Stack className="text-center">
                  <span className="text">{val.name}</span>
                </Stack>
              </div>
            );
          })}
        </Stack>
        <div className="btn_container shadow">
          <ChevronRight size={24} onClick={() => scroll(212)} className='rbtn'/>
        </div>
      </Stack>
      <Menu id={menu_id} />
    </Container>
  );
}

export default CarouselSlide;
