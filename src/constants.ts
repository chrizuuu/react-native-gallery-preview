import type { WithSpringConfig } from "react-native-reanimated";

export const MIN_SCALE = 1;
export const MAX_SCALE = 8;
export const DURATION = 400;

export const SPRING_CONFIG: WithSpringConfig = {
  damping: 1000,
  mass: 1,
  stiffness: 250,
};
