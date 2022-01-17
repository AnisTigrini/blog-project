import styles from "./Navigation.module.css";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className={styles["main-navigation"]}>
      <Link to="/">Posts</Link>
      <Link to="/create-post">Create Post</Link>
    </nav>
  );
};

export default Navigation;
