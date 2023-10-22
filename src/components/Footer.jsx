import styles from "../styles/Footer.module.css";
import Guild from "./Guild";
import Setting from "./Setting";
import GithubLink from "./GithubLink";

function Footer({ setting, onSetting }) {
  return (
    <footer className={styles.footer}>
      <Guild setting={setting} />
      <GithubLink />
      <Setting setting={setting} onSetting={onSetting} />
    </footer>
  );
}

export default Footer;
