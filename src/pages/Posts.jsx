import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Typography, Grid, Paper, Divider } from "@mui/material";

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
      textAlign: "center",
    },
    post: {
      padding: "16px",
      margin: "16px 0",
      position: "relative",
    },
    userDetails: {
      position: "absolute",
      top: "28px",
      left: "8px",
    },
    userName: {
      fontWeight: "bold",
      marginRight: "8px",
    },
    postContent: {
      marginLeft: "64px",
      marginTop: "8px",
    },
    postTime: {
      fontSize: "0.8rem",
    },
  };

  return (
    <Box style={styles.container}>
      <Typography variant="h4" style={styles.header}>
        Community Posts
      </Typography>
      <Grid container spacing={2} justifyContent="center">
        {posts.map((post) => (
          <Grid item key={post._id} xs={12} md={8}>
            <Paper elevation={3} style={styles.post}>
              <Box style={styles.userDetails}>
                <Typography variant="body1" style={styles.userName}>
                  {post.userId.name || "Unknown"}
                </Typography>
                <Typography variant="body2" style={styles.postTime}>
                  {new Date(post.createdAt).toLocaleString("en-US", {
                    month: "2-digit",
                    day: "2-digit",
                    year: "2-digit",
                    hour: "2-digit",
                    minute: "2-digit",
                    hour12: true,
                  })}
                </Typography>
              </Box>
              <Divider />
              <Box style={styles.postContent}>
                <Typography variant="h6">{post.sport}</Typography>
                <Typography variant="body1">{post.post}</Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Posts;
