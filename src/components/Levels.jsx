import Button from "./Button";

function Levels({ setting }) {
  const defaultProps = {
    sound: setting.sound,
  };

  return (
    <div>
      <Button {...defaultProps}>Easy</Button>
      <Button {...defaultProps}>Medium</Button>
      <Button {...defaultProps}>Hard</Button>
    </div>
  );
}

export default Levels;
