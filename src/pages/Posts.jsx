import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper } from "@mui/material";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    let response = await axios.get(
      "https://wager-server-946d5db015ae.herokuapp.com/posts"
    );
    setPosts(response.data);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const styles = {
    container: {
      padding: "16px",
    },
    header: {
      marginBottom: "16px",
    },
    post: {
      padding: "16px",
      margin: "16px 0",
      width: "100%",
      maxWidth: "80%",
      minWidth: "60%",
      marginLeft: "auto",
      marginRight: "auto",
      display: "flex",
    },
    userDetails: {
      marginRight: "16px",
      textAlign: "left",
    },
    postContent: {
      flex: 1,
    },
  };

  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.header} textAlign="center">
        Community Posts
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post) => (
          <Grid item key={post._id} xs={12}>
            <Box style={styles.post}>
              <Box style={styles.userDetails}>
                <Typography variant="body1">
                  <strong>{post.userId.name || "Unknown User"}</strong>
                </Typography>
                <Typography variant="body2">
                  {new Date(post.createdAt).toLocaleString()}
                </Typography>
              </Box>
              <Paper elevation={3} style={{ padding: "16px", flex: 1 }}>
                <Typography variant="h6">{post.sport}</Typography>
                <Typography variant="body1">{post.post}</Typography>
              </Paper>
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Posts;
