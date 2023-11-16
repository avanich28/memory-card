import styles from "../styles/Footer.module.css";
import Guild from "./Guild";
import Setting from "./Setting";
import GithubLink from "./GithubLink";

function Footer() {
  return (
    <footer className={styles.footer}>
      <Guild />
      <GithubLink />
      <Setting />
    </footer>
  );
}

export default Footer;
