import { create } from "zustand";
import { nanoid } from "nanoid";

const getItem = (key) => JSON.parse(window.localStorage.getItem(key));
const setItem = (key, value) =>
  window.localStorage.setItem(key, JSON.stringify(value));

export const useStore = create((set) => ({
  texture: "dirt",
  cubes: getItem("cubes") || [],
  addCube: (x, y, z) => {
    set((prev) => ({
      cubes: [
        ...prev.cubes,
        {
          key: nanoid(),
          position: [x, y, z],
          texture: prev.texture,
        },
      ],
    }));
  },
  removeCube: (x, y, z) => {
    set((prev) => ({
      cubes: prev.cubes.filter(
        ({ position }) =>
          position[0] != x && position[1] != y && position[2] != z
      ),
    }));
  },
  setTexture: (texture) => {
    set(() => ({
      texture,
    }));
  },
  saveWorld: () => {
    set((prev) => {
      setItem("cubes", prev.cubes);
      return prev;
    });
  },
  resetWorld: () => {
    set(() => ({
      cubes: [],
    }));
  },
}));
