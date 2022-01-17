import { useState } from "react";
import PostError from "../../create-post/post-error/PostError";
import styles from "./Post.module.css";

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

      fetch("http://localhost:8080/api/edit-post", {
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
      <div className={styles.post}>
        <div className={styles["post-info"]}>
          <h3>{props.author}</h3>
          <h5>{props.date}</h5>
        </div>
        <hr />
        <p>{props.postDescription}</p>
        <button type="button" onClick={editHandler}>
          Edit
        </button>
      </div>
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
