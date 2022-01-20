import { useState } from "react";
import styles from "./CreatePost.module.css";
import PostError from "./post-error/PostError";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  let navigate = useNavigate();
  const [authorName, setAuthorName] = useState("");
  const [postDescription, setPostDescription] = useState("");
  const [postError, setPostError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const authorNameHandler = (e) => {
    setAuthorName(e.target.value);
  };

  const postDescriptionHandler = (e) => {
    setPostDescription(e.target.value);
  };

  const submitPostHandler = (e) => {
    e.preventDefault();

    if (authorName.length === 0 || postDescription.length === 0) {
      setPostError(true);
      setErrorMessage("One or multiple fields empty!");
    } else {
      fetch(`${process.env.REACT_APP_TARGET_HOST}/api/posts`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          authorName: authorName,
          postDescription: postDescription,
        }),
      })
        .then(function (res) {
          setPostError(false);
          setAuthorName("");
          setPostDescription("");
          navigate("/");
        })
        .catch(function (res) {
          setPostError(true);
          setErrorMessage("Failed to contact the API");
        });
    }
  };

  return (
    <div className={styles["create-post"]}>
      <form onSubmit={submitPostHandler}>
        {postError ? <PostError>{errorMessage}</PostError> : null}
        <label>Author</label>
        <input type="text" onChange={authorNameHandler} value={authorName} />

        <label>What's happening?</label>
        <textarea onChange={postDescriptionHandler} value={postDescription} />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreatePost;
