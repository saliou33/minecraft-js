import { useThree, useFrame } from "@react-three/fiber";
import { useSphere } from "@react-three/cannon";
import { useEffect, useRef } from "react";
import { Vector3 } from "three";
import { useKeyboard } from "../../hooks/useKeyboard";

const JUMP_FORCE = 4;
const SPEED = 4;

const Player = () => {
  // hooks for key event
  const {
    moveForward,
    moveBackward,
    moveLeft,
    moveRight,
    jump,
    texture1,
    texture2,
    texture3,
    texture4,
    texture5,
  } = useKeyboard();

  // camera
  const { camera } = useThree();

  // sphere
  const [ref, api] = useSphere(() => ({
    mass: 1,
    type: "Dynamic",
    position: [0, 1, 0],
  }));

  // velocity
  const vel = useRef([0, 0, 0]);
  useEffect(() => {
    api.velocity.subscribe((v) => {
      vel.current = v;
    });
  }, [api.velocity]);

  // position of the player
  const pos = useRef([0, 0, 0]);
  useEffect(() => {
    api.position.subscribe((p) => {
      pos.current = p;
    });
  }, [api.position]);

  // frame upate
  useFrame(() => {
    camera.position.copy(
      new Vector3(pos.current[0], pos.current[1], pos.current[2])
    );

    const direction = new Vector3();
    const front = new Vector3().setZ(
      (moveBackward ? 1 : 0) - (moveForward ? 1 : 0)
    );
    const side = new Vector3().setX((moveLeft ? 1 : 0) - (moveRight ? 1 : 0));

    direction
      .subVectors(front, side)
      .normalize()
      .multiplyScalar(SPEED)
      .applyEuler(camera.rotation);

    api.velocity.set(direction.x, vel.current[1], direction.z);

    if (jump && Math.abs(vel.current[1]) < 0.005) {
      api.velocity.set(vel.current[0], JUMP_FORCE, vel.current[1]);
    }
  });

  return <mesh ref={ref}></mesh>;
};

export default Player;
