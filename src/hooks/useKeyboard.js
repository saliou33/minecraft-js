import { useCallback, useEffect, useState } from "react";

const actionByKey = (key) => {
  const keyActionMap = {
    KeyW: "moveForward",
    KeyA: "moveLeft",
    KeyD: "moveRight",
    KeyS: "moveBackward",
    Space: "jump",
    Digit1: "dirt",
    Digit2: "grass",
    Digit3: "glass",
    Digit4: "wood",
    Digit5: "log",
  };

  return keyActionMap[key];
};

export const useKeyboard = () => {
  const [actions, setActions] = useState({
    moveForward: false,
    moveBackward: false,
    moveLeft: false,
    moveRight: false,
    jump: false,
    dirt: false,
    grass: false,
    glass: false,
    wood: false,
    log: false,
  });

  const handleKeydown = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => ({ ...prev, [action]: true }));
    }
  }, []);

  const handleKeyup = useCallback((e) => {
    const action = actionByKey(e.code);
    if (action) {
      setActions((prev) => ({ ...prev, [action]: false }));
    }
  }, []);

  useEffect(() => {
    document.addEventListener("keydown", handleKeydown);
    document.addEventListener("keyup", handleKeyup);

    return () => {
      document.removeEventListener("keydown", handleKeydown);
      document.removeEventListener("keyup", handleKeyup);
    };
  }, [handleKeydown, handleKeyup]);

  return actions;
};
