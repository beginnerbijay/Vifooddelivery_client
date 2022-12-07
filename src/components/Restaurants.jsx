import React from "react";
import Container from "react-bootstrap/Container";
import Banner from "./Banner";
import CarouselSlide from "./CarouselSlide";

function Restaurants() {
  return (
    <Container>
      <Banner />
      <CarouselSlide />
    </Container>
  );
}

export default Restaurants;
