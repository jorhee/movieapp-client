// src/pages/Home.js

import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap'; // React-Bootstrap components
import { MovieCreation } from '@mui/icons-material'; // Material UI Icon

const HeroSection = () => {
  const sampleMovies = [
    { title: "Movie 1", description: "This is movie 1" },
    { title: "Movie 2", description: "This is movie 2" },
    { title: "Movie 3", description: "This is movie 3" },
  ];

  return (
    <Container>
      <h1 className="my-4 text-center">Featured Movies</h1>
      <Row>
        {sampleMovies.map((movie, index) => (
          <Col md={4} key={index} className="mb-4">
            <Card>
              <Card.Img variant="top" src={`https://via.placeholder.com/300`} />
              <Card.Body>
                <Card.Title>
                  <MovieCreation /> {movie.title}
                </Card.Title>
                <Card.Text>{movie.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default HeroSection;
