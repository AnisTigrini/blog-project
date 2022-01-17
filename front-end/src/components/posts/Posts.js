import { useEffect, useState } from "react";
import Post from "./post/Post";
import styles from "./Posts.module.css";

const Posts = () => {
  const [posts, setPosts] = useState();

  useEffect(() => {
    fetch("http://localhost:8080/api/posts")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return (
    <div className={styles.posts}>
      <h1>Posts</h1>
      {posts
        ? posts.map((post) => {
            return (
              <Post
                postId={post.PostId}
                key={post.PostId}
                author={post.authorName}
                date={post.PostDate}
                postDescription={post.postDescription}
              />
            );
          })
        : null}
    </div>
  );
};

export default Posts;
