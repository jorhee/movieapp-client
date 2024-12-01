import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardMedia, Typography, Grid, Container } from '@mui/material';
import { Button } from 'react-bootstrap';
import '../css/MoviesPage.css'; // Import custom CSS file

const UserViewPage = () => {
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
    <Container>
      <Typography variant="h4" className="my-4 text-center">All Movies</Typography>
      <Grid container spacing={4}>
        {movies.map((movie) => (
          <Grid item xs={12} sm={6} md={4} key={movie._id}>
            <Card className="movie-card">
              {movie.picture && (
                <CardMedia
                  component="img"
                  alt={movie.title}
                  height="300"
                  image={`${process.env.REACT_APP_API_BASE_URL}/${movie.picture}`}
                  title={movie.title}
                />
              )}
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {movie.title}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Director:</strong> {movie.director}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Year:</strong> {movie.year}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Genre:</strong> {movie.genre}
                </Typography>
                <Typography variant="body2" color="textSecondary" paragraph>
                  <strong>Description:</strong> {movie.description}
                </Typography>
                <Button variant="primary" className="movie-btn">View Details</Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default UserViewPage;
