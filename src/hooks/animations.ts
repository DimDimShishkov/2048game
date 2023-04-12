import { keyframes } from "styled-components";

export const appear = keyframes`
  0% {
    transform: scale(0.7);
  }
  50% {
    transform: scale(1.3);
  }
  100% {
    transform: scale(1);
  }
`;

export const merging = keyframes`
  from {
    transform: scale(0.2);
  }
  to {
    transform: scale(1);
  }
`;
