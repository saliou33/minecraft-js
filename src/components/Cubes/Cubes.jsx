import { useStore } from "../../hooks/useStore";
import Cube from "../Cube/Cube";

const Cubes = () => {
  const [cubes] = useStore((state) => [state.cubes]);
  return cubes.map((x) => <Cube key={x.key} {...x} />);
};

export default Cubes;
