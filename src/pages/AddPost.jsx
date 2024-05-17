import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Box,
  Container,
  Typography,
  Paper,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";

const AddPost = () => {
  let navigate = useNavigate();

  const [post, setPost] = useState({
    post: "",
    sport: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost((prevPost) => ({
      ...prevPost,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setPost((prevPost) => ({
      ...prevPost,
      sport: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "https://wager-server-946d5db015ae.herokuapp.com/posts",
        post,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      navigate("/discussion");
    } catch (error) {
      console.error("Error posting:", error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 3, marginTop: 3 }}>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" component="h2" gutterBottom>
            Enter Post Below
          </Typography>
          <TextField
            label="Post"
            name="post"
            value={post.post}
            onChange={handleChange}
            fullWidth
            margin="normal"
            required
            multiline
            rows={4}
          />
          <FormControl fullWidth margin="normal">
            <InputLabel id="sport-label">Sport</InputLabel>
            <Select
              labelId="sport-label"
              name="sport"
              value={post.sport}
              onChange={handleSelectChange}
              required
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="Basketball">Basketball</MenuItem>
              <MenuItem value="Football">Football</MenuItem>
              <MenuItem value="Baseball">Baseball</MenuItem>
              <MenuItem value="Soccer">Soccer</MenuItem>
              <MenuItem value="Golf">Golf</MenuItem>
              <MenuItem value="Tennis">Tennis</MenuItem>
              <MenuItem value="Boxing">Boxing</MenuItem>
              <MenuItem value="MMA">MMA</MenuItem>
              <MenuItem value="Hockey">Hockey</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ mt: 3 }}
          >
            Post
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default AddPost;
