import { useState, useContext } from "react";
import { Form, Button, Container } from "react-bootstrap";
import { Navigate, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import { Notyf } from "notyf";

export default function AddMoviePage() {
  const notyf = new Notyf();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  // Input states
  const [title, setTitle] = useState("");
  const [director, setDirector] = useState("");
  const [year, setYear] = useState("");
  const [description, setDescription] = useState("");
  const [genre, setGenre] = useState("");
  const [picture, setPicture] = useState(null);

  // Async function to create the movie
  async function createMovie(e) {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("director", director);
    formData.append("year", year);
    formData.append("description", description);
    formData.append("genre", genre);
    if (picture) {
      formData.append("picture", picture);
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/movies/addMovie`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData, // Send FormData instead of JSON
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Error: ${response.status} - ${errorText}`);
        throw new Error("Failed to add movie");
      }

      // Reset form fields on success
      setTitle("");
      setDirector("");
      setYear("");
      setDescription("");
      setGenre("");
      setPicture(null);
      notyf.success("Movie added successfully.");
      navigate("/movies");
    } catch (error) {
      console.error("Error:", error);
      notyf.error("Error: Something went wrong.");
    }
  }

  // Conditional rendering while user data is loading
  if (!user) {
    return <div>Loading...</div>;
  }

  return user.isAdmin ? (
    <Container>
      <h1 className="my-4 text-center">Add Movie</h1>
      <Form
        onSubmit={createMovie}
        encType="multipart/form-data"
        className="border rounded border-primary p-4"
      >
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Title</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Title"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Director</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Director"
            required
            value={director}
            onChange={(e) => setDirector(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Year</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Year"
            required
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Description</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Description"
            required
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Genre</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Genre"
            required
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label className="fw-semibold">Picture</Form.Label>
          <Form.Control
            type="file"
            onChange={(e) => setPicture(e.target.files[0])}
            accept="image/*"
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          className="mt-3 w-100"
        >
          Submit
        </Button>
      </Form>
    </Container>
  ) : (
    <Navigate to="/movies" />
  );
}
