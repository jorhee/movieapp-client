// src/pages/Home.js

import React from 'react';
import { Container, Row } from 'react-bootstrap';
import HeroSection from '../components/HeroSection';


const Home = () => {


  return (
    <Container>
      <h1 className="my-4 text-center">Best Movies</h1>
      <Row>
        <>
        <HeroSection />
        </>
      </Row>
    </Container>
  );
};

export default Home;
