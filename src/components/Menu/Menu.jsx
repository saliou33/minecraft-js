import { useStore } from "./../../hooks/useStore";
const Menu = () => {
  const [resetWorld, saveWorld] = useStore((state) => [
    state.resetWorld,
    state.saveWorld,
  ]);

  return (
    <div className="menu absolute">
      <button
        onClick={() => {
          resetWorld();
        }}
      >
        reset
      </button>
      <button
        onClick={() => {
          saveWorld();
        }}
      >
        save
      </button>
    </div>
  );
};

export default Menu;
