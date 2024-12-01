import React, { useState, useEffect } from 'react';
import { Table, Container, Button } from 'react-bootstrap';
import { Typography } from '@mui/material';
import '../css/AdminViewPage.css'; // Import custom CSS file

const AdminViewPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movies data from the API using fetch
    fetch(`${process.env.REACT_APP_API_BASE_URL}/movies/getMovies`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        return response.json();
      })
      .then(data => {
        setMovies(data.movies);
        setLoading(false);
      })
      .catch(err => {
        setError('Error fetching movies');
        setLoading(false);
      });
  }, []);

  // Loading or error display
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container className="admin-view-page">
      <Typography variant="h4" className="my-4 text-center">Admin View - All Movies</Typography>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>Title</th>
            <th>Director</th>
            <th>Year</th>
            <th>Genre</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {movies.map((movie) => (
            <tr key={movie._id}>
              <td>{movie.title}</td>
              <td>{movie.director}</td>
              <td>{movie.year}</td>
              <td>{movie.genre}</td>
              <td>{movie.description}</td>
              <td>
                <Button variant="primary" className="btn-sm">View Details</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default AdminViewPage;
