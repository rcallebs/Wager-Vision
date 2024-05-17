import React, { useState, useEffect } from "react";
import axios from "axios";
import BetSlip from "../components/BetSlip";
import { Box, Typography, Grid } from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    // const token = localStorage.getItem("token");
    let response = await axios.get(
      "https://wager-server-946d5db015ae.herokuapp.com/posts"
      //   {
      //     headers: {
      //       Authorization: `Bearer ${token}`,
      //     },
      //   }
    );
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const basketballPosts = posts.filter((post) => post.sports);

  const styles = {
    container: {
      padding: "16px",
    },
    header: {
      marginBottom: "16px",
    },
  };

  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.header} textAlign="center">
        Community Posts
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} sm={6} md={4}></Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Posts;
