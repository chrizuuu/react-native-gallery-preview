import { SpringConfig } from "react-native-reanimated/lib/typescript/animation/springUtils";

export const MIN_SCALE = 1;
export const MAX_SCALE = 8;
export const DURATION = 400;

export const SPRING_CONFIG: SpringConfig = {
  damping: 1000,
  mass: 1,
  stiffness: 250,
  restDisplacementThreshold: 0.02,
  restSpeedThreshold: 4,
};
