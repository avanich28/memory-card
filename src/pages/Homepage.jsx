import styles from "../styles/Homepage.module.css";
import Logo from "../components/Logo";
import Footer from "../components/Footer";
import Button from "../components/Button";

function Homepage() {
  return (
    <main className={styles.homepage}>
      <Logo />
      <Button>Play Game</Button>
      <Footer />
    </main>
  );
}

export default Homepage;
