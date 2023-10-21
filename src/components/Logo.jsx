import logo from "../assets/logo.svg";
import pokeball from "../assets/pokeball.png";

function Logo() {
  return (
    <header>
      <img src={logo} alt="Pokemon Logo" />
      <h2>
        Mem
        <span>
          <img src={pokeball} alt="Pokeball" />
        </span>
        ry Card
      </h2>
    </header>
  );
}

export default Logo;
