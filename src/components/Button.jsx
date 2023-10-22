import useSound from "use-sound";
import pokemonClick from "../assets/pokemon-click.mp3";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ icon = "", children, onClick, sound }) {
  const [clickSound] = useSound(pokemonClick);
  const hasIcon = icon.length > 0;

  function handleClick() {
    onClick();
    if (sound) clickSound();
  }

  if (hasIcon)
    return (
      <button onClick={handleClick}>
        <FontAwesomeIcon icon={["fas", icon]} />
      </button>
    );

  return <button onClick={handleClick}>{children}</button>;
}

export default Button;
