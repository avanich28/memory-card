import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/GithubLink.module.css";

function GithubLink() {
  return (
    <div className={styles.github}>
      <a href="https://github.com/avanich28/memory-card.git">
        <FontAwesomeIcon icon={["fab", "github"]} />
      </a>
      <p>&copy; Copyright by avanich28</p>
    </div>
  );
}

export default GithubLink;
