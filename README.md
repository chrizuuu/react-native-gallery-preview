# react-native-gallery-preview

GalleryPreview is a modal component for gallery preview with full gesture support, based on [Reanimated](https://docs.swmansion.com/react-native-reanimated/) and [React Native Gesture Handler](https://docs.swmansion.com/react-native-gesture-handler/).

### Features

* ⚡  Smooth gesture interactions and animations
* 🔍 Double Tap and Pinch to zoom
* 👆 Pull down to close
* 📱 Supports both iOS and Android.

Get started by [setting up reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation) and [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)!

```sh
npm install react-native-gallery-preview
# or
yarn add react-native-gallery-preview

```

### Example

```tsx
import React, { useState } from 'react';
import { Button, View } from 'react-native';
import GalleryPreview from 'react-native-gallery-preview';

export const App = () => {
  const [isVisible, setIsVisible] = useState(false);

  const images = [
    { uri: 'https://example.com/image1.jpg' },
    { uri: 'https://example.com/image2.jpg' },
    // Add more images here
  ];

  return (
    <View>
      <Button title="Open Gallery Preview" onPress={() => setIsVisible(true)} />
      <GalleryPreview
        isVisible={isVisible}
        onRequestClose={() => setIsVisible(false)}
        images={images}
      />
    </View>
  );
};
```
