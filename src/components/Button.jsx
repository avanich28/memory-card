import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Button({ icon = "", children, onClick }) {
  const hasIcon = icon.length > 0;

  if (hasIcon)
    return (
      <button onClick={onClick}>
        <FontAwesomeIcon icon={["fas", icon]} />
      </button>
    );

  return <button>{children}</button>;
}

export default Button;
