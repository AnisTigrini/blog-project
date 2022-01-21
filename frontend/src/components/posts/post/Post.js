import { useState } from "react";
import PostError from "../../create-post/post-error/PostError";
import styles from "./Post.module.css";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";

const Post = (props) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [authorName, setAuthorName] = useState(props.author);
  const [postDescription, setPostDescription] = useState(props.postDescription);
  const [postError, setPostError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const editHandler = () => {
    setIsEditMode(true);
  };

  const cancelHandler = () => {
    setIsEditMode(false);
  };

  const descriptionHandler = (e) => {
    setPostDescription(e.target.value);
  };

  const authorNameHandler = (e) => {
    setAuthorName(e.target.value);
  };

  const submitPostHandler = (e) => {
    e.preventDefault();

    if (authorName.length === 0 || postDescription.length === 0) {
      setPostError(true);
      setErrorMessage("One or multiple fields empty!");
    } else if (
      authorName === props.author &&
      postDescription === props.postDescription
    ) {
      setPostError(true);
      setErrorMessage("You did not edit anything!");
    } else {
      setPostError(false);
      setIsEditMode(false);

      fetch(`${process.env.REACT_APP_TARGET_HOST}/api/edit-post`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({
          postId: props.postId,
          authorName: authorName,
          postDescription: postDescription,
        }),
      })
        .then(function (res) {
          setPostError(false);
          window.location.reload(false);
        })
        .catch(function (res) {
          setPostError(true);
          setErrorMessage("Failed to contact the API");
        });
    }
  };

  if (!isEditMode) {
    return (
      <Card sx={{ maxWidth: 345, margin: "5px" }}>
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
              {props.author.charAt(0)}
            </Avatar>
          }
          action={
            <IconButton aria-label="settings" onClick={editHandler}>
              <EditIcon />
            </IconButton>
          }
          title={props.author}
          subheader={props.date}
        />

        <CardContent>
          <Typography variant="body2" color="text.secondary">
            {props.postDescription}
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="share">
            <ShareIcon />
          </IconButton>
        </CardActions>
      </Card>
    );
  } else {
    return (
      <form className={styles.post} onSubmit={submitPostHandler}>
        {postError ? <PostError>{errorMessage}</PostError> : null}
        <label>Author</label>
        <input type="text" value={authorName} onChange={authorNameHandler} />
        <label>Post Description</label>
        <textarea value={postDescription} onChange={descriptionHandler} />
        <div className={styles.buttons}>
          <button type="button" onClick={cancelHandler}>
            Cancel
          </button>
          <button type="submit">Post</button>
        </div>
      </form>
    );
  }
};

export default Post;
