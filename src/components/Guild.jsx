import { useState } from "react";
import Button from "./Button";

function Guild() {
  const [isActive, setIsActive] = useState(false);

  return (
    <Button
      icon={isActive ? "xmark" : "question"}
      onClick={() => setIsActive(!isActive)}
    />
  );
}

export default Guild;
