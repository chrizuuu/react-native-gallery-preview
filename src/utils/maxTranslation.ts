const top = (screenHeight: number, contentHeight: number, scale: number) => {
  'worklet';
  return contentHeight * scale < screenHeight ? 0 : (contentHeight * scale - screenHeight) / 2;
};

const left = (screenWidth: number, contentWidth: number, scale: number) => {
  'worklet';

  return contentWidth * scale < screenWidth ? 0 : (contentWidth * scale - screenWidth) / 2;
};

const maxTranslationX = (
  screenWidth: number,
  contentWidth: number,
  translateX: number,
  scale: number,
) => {
  'worklet';
  const maxXOffset = left(screenWidth, contentWidth, scale);

  if (translateX > maxXOffset) {
    return maxXOffset;
  }

  if (translateX < -maxXOffset) {
    return -maxXOffset;
  }
  return translateX;
};

const maxTranslationY = (
  screenHeight: number,
  contentHeight: number,
  translateY: number,
  scale: number,
) => {
  'worklet';
  const maxYOffset = top(screenHeight, contentHeight, scale);
  if (translateY > maxYOffset) {
    return maxYOffset;
  }

  if (translateY < -maxYOffset) {
    return -maxYOffset;
  }
  return translateY;
};

export { maxTranslationX, maxTranslationY };
