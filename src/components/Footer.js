import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { GitHub, LinkedIn } from '@mui/icons-material'; // Material-UI icons for social links
import '../css/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row>
          <Col className="text-center">
            <p>&copy; {new Date().getFullYear()} MovieApp. All rights reserved.</p>
            <p>
              <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                <GitHub /> GitHub
              </a>{' '}
              |{' '}
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
                <LinkedIn /> LinkedIn
              </a>
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
