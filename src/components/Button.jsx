import useSound from "use-sound";
import { useSetting } from "../contexts/SettingContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import pokemonClick from "../assets/pokemon-click.mp3";

function Button({ icon = "", children, onClick }) {
  const { setting } = useSetting();
  const [clickSound] = useSound(pokemonClick);
  const hasIcon = icon.length > 0;

  function handleClick() {
    onClick();
    if (setting.sound) clickSound();
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
