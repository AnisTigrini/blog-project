import styles from "./PostError.module.css";

const PostError = (props) => {
  return <div className={styles["post-error"]}>{props.children}</div>;
};

export default PostError;
