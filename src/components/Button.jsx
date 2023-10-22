import useSound from "use-sound";
import pokemonClick from "../assets/pokemon-click.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ icon = "", children, onClick }) {
  const [clickSound] = useSound(pokemonClick);
  const hasIcon = icon.length > 0;

  if (hasIcon)
    return (
      <button
        onClick={() => {
          onClick();
          clickSound();
        }}
      >
        <FontAwesomeIcon icon={["fas", icon]} />
      </button>
    );

  return (
    <button
      onClick={() => {
        onClick();
        clickSound();
      }}
    >
      {children}
    </button>
  );
}

export default Button;
