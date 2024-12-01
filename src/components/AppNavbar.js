// src/components/Navbar.js

import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Home, Movie, AddCircle } from '@mui/icons-material'; // Material UI icons

const AppNavbar = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand href="/">MovieApp</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/">
              <Home /> Home
            </Nav.Link>
            <Nav.Link href="/movies">
              <Movie /> Movies
            </Nav.Link>
            <Nav.Link href="/add-movie">
              <AddCircle /> Add Movie
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
