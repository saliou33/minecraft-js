import { useEffect, useState } from "react";
import { useStore } from "./../../hooks/useStore";
import { useKeyboard } from "./../../hooks/useKeyboard";
import {
  dirtImg,
  glassImg,
  grassImg,
  woodImg,
  logImg,
} from "../../assets/images";

const images = {
  dirt: dirtImg,
  grass: grassImg,
  glass: glassImg,
  wood: woodImg,
  log: logImg,
};

const TextureSelector = () => {
  const [visible, setVisible] = useState(false);
  const [activeTexture, setTexture] = useStore((state) => [
    state.texture,
    state.setTexture,
  ]);
  const { dirt, grass, glass, wood, log } = useKeyboard();

  useEffect(() => {
    const textures = {
      dirt,
      grass,
      glass,
      wood,
      log,
    };

    const pressedTexture = Object.entries(textures).find(([_, v]) => v);
    if (pressedTexture) {
      setTexture(pressedTexture[0]);
    }
  }, [dirt, grass, glass, wood, log, setTexture]);

  useEffect(() => {
    const visibilityTimeout = setTimeout(() => {
      setVisible(false);
    }, 2000);
    setVisible(true);

    return () => {
      clearTimeout(visibilityTimeout);
    };
  }, [activeTexture]);

  return (
    visible && (
      <div className="absolute centered texture-selector">
        {Object.entries(images).map(([k, v]) => (
          <img
            key={k}
            src={v}
            alt={k}
            className={`${k === activeTexture ? "active" : ""}`}
          />
        ))}
      </div>
    )
  );
};

export default TextureSelector;
