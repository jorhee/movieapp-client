import React, { useState, useEffect, useContext } from 'react';
import { Container } from 'react-bootstrap';
import { AuthContext } from '../context/AuthContext'; // Import your AuthContext
import AdminViewPage from './AdminViewPage';
import UserViewPage from './UserViewPage';

const MoviesPage = () => {
  const { user } = useContext(AuthContext); // Get user info from AuthContext
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch movies data only if the user is logged in
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
  }, []); // Run once when the component mounts

  // If loading, display a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If error fetching, show an error message
  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Container>
      {user?.isAdmin ? (
        <AdminViewPage movies={movies} />
      ) : (
        <UserViewPage movies={movies} />
      )}
    </Container>
  );
};

export default MoviesPage;
