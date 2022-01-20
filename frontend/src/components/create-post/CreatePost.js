import { useState } from "react";
import PostError from "./post-error/PostError";
import { useNavigate } from "react-router-dom";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import { TextareaAutosize } from "@mui/base";

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
    <Box
      component="form"
      sx={{
        display: "flex",
        flexDirection: "column",
        padding: "10px",
        margin: "5px",
        rowGap: "10px",
        width: "50%",
        justifySelf: "center",
        alignSelf: "center",
      }}
      noValidate
      autoComplete="off"
      onSubmit={submitPostHandler}
    >
      {postError ? <PostError>{errorMessage}</PostError> : null}
      <TextField
        id="outlined-basic"
        label="author"
        variant="outlined"
        onChange={authorNameHandler}
        value={authorName}
        fullWidth
      />
      <TextareaAutosize
        maxRows={4}
        aria-label="maximum height"
        placeholder="What are you thinking?"
        style={{ background: "transparent", height: "200px", padding: "5px" }}
        onChange={postDescriptionHandler}
        value={postDescription}
      />
      <Button
        sx={{ width: "fit-content", alignSelf: "center" }}
        variant="contained"
        type="submit"
        endIcon={<SendIcon />}
      >
        Submit
      </Button>
    </Box>
  );
};

export default CreatePost;
