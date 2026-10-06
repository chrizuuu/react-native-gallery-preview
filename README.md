


  
 # react-native-gallery-preview
  
  <div>
    <img align="right" height="720" src="example.gif">
  </div>

  **GalleryPreview** is a flexible modal component for easy gallery previews with full gesture support. Using `Reanimated` and `React Native Gesture Handler`, it gives a smooth and simple user experience for both iOS and Android.
  
  ### Features
  
  * ⚡  **Smooth Gesture Interactions and Animations:** Experience fluid and responsive animations and gestures for a delightful user interface.
  * 🔍 **Double Tap and Pinch to zoom:** Users can effortlessly zoom in and out of images with simple double-tap and pinch gestures
  * 👆 **Pull down to close:** Intuitive pull-down gesture to close the gallery preview, making navigation seamless.
  *  ↔️ **RTL Support**
  * 📱 **Supports both `iOS` and `Android`:** Fully compatible with both iOS and Android devices, ensuring a consistent experience across platforms.
  * 📱 **Compatible with `Expo`**
  ### Get started
  Before you can use GalleryPreview, you need to set up react-native-reanimated, react-native-gesture-handler, and react-native-safe-area-context. Follow the links below for detailed installation guides:
  
  * [Setting up Reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started/#installation)
  * [Setting up React Native Gesture Handler](ht↔️tps://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)
  * [Setting up React Native Safe Area Context](https://appandflow.github.io/react-native-safe-area-context/)

  The gallery provides its own `SafeAreaProvider` inside the modal. Custom overlays can use `SafeAreaView` from `react-native-safe-area-context`, with top/side edges for headers and bottom/side edges for footers.

  Once the dependencies are installed, you can add react-native-gallery-preview to your project:
  
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
        onChange={(index) => console.log('Current image index:', index)}
      />
    </View>
  );
};
```

The optional `onChange(index)` callback receives the zero-based index whenever the current item changes. It works in both `images` and `children` modes and is not called on initial render. Rerendering or swiping without changing the index does not trigger another callback; reopening the gallery at a different `initialIndex` does.

### Loading placeholders

In `images` mode, each item accepts an optional `isLoading` flag. When it is `true`, or the item has no `uri` (including an empty string), the gallery displays a centered loading indicator instead of mounting `ImageComponent`. The item remains swipeable, including swipe to close, while pinch and double-tap zoom are disabled until the image is available.

```tsx
<GalleryPreview
  isVisible={isVisible}
  onRequestClose={handleClose}
  images={[
    { uri: 'https://example.com/image1.jpg' },
    { isLoading: true }, // URL is not available yet
    { uri: 'https://example.com/image3.jpg', isLoading: true },
  ]}
  onChange={handleIndexChange}
  LoadingComponent={({ index }) => <MyLoader imageIndex={index} />}
/>
```

`LoadingComponent` is optional; the default is a white `ActivityIndicator`. Custom loaders receive the item's zero-based `index` through the exported `GalleryLoadingComponentProps` type. The loading flag is managed by your application and does not automatically track the native image download.

For a gallery of 400 items with the first 20 already fetched, create all 400 positions up front. Inside your component, initialize state from your first page:

```tsx
// ImageItemURI can be imported from react-native-gallery-preview.
const [images, setImages] = useState<ImageItemURI[]>(() =>
  Array.from({ length: 400 }, (_, index) =>
    initialImages[index] ?? { isLoading: true }
  )
);
```

When another page arrives, replace its placeholders at their existing indices using a new array. Keep the array length and item order stable so the gallery stays at the current index:

```tsx
const applyPage = (startIndex: number, page: ImageItemURI[]) => {
  setImages((current) =>
    current.map((item, index) => {
      const loadedImage = page[index - startIndex];
      return loadedImage ? { ...loadedImage, isLoading: false } : item;
    })
  );
};
```

Use `onChange` to fetch or prefetch the page containing the current index. Fetch the initial page when opening the gallery, since `onChange` is not called on initial render.

### Props

| Prop Name                  | Type                                      | Description                                                                                                                      | Default                                                                                                            |
|----------------------------|-------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------|
| `isVisible`                | `boolean`                                 | Controls the visibility of the image viewer modal.                                                                               | -                                                                                                                  |
| `onRequestClose`           | `() => void`                              | Function to close the image viewer modal.                                                                                        | -                                                                                                                  |
| `onChange?`                | `(index: number) => void`                 | Called when the current item index changes (zero-based). Available in both images and children modes. Not called on initial render. | -                                                                                                                  |
| `images`                   | `ImageItemURI[]`                          | Array of image sources or loading placeholders. Each item optionally accepts `isLoading`; `uri` may be omitted while loading.     | -                                                                                                                  |
| `initialIndex?`             | `number`                                  | The initial index of the image to be displayed when the viewer is opened.                                                       | `0`                                                                                                                |
| `gap?`                      | `number`                                  | The gap between images in the viewer.                                                                                           | `24`                                                                                                               |
| `simultaneousRenderedImages?` | `number`                                  | The number of images rendered simultaneously for optimization.                                                                | `6`                                                                                                                |                                                                                                           |
| `OverlayComponent?`          | `(props: GalleryOverlayProps) => React.ReactNode` | Optional component to be rendered above the image viewer.                                                          | -                                                                                                                  |
| `ImageComponent?`           | `(props: GalleryImageComponentProps) => React.JSX.Element` | Optional custom component to render each image.                                                                                  | -                                                                                                                  |
| `LoadingComponent?`         | `(props: GalleryLoadingComponentProps) => React.ReactNode` | Custom loading component in images mode. Receives the item's zero-based `index`.                                                  | Centered white `ActivityIndicator`                                                                                  |
| `springConfig?`             | `SpringConfig`                            | Spring configuration for animations.                                                                                             | `{ damping: 1000, mass: 1, stiffness: 250, restDisplacementThreshold: 0.02, restSpeedThreshold: 4 }`                |
| `doubleTabEnabled?`           | `boolean`                                        | Enable or disable double-tap to zoom functionality.                                                                              | `true`                                                                                                             |
| `pinchEnabled?`               | `boolean`                                        | Enable or disable pinch to zoom functionality.                                                                                   | `true`                                                                                                             |
| `swipeToCloseEnabled?`        | `boolean`                                        | Enable or disable swipe to close functionality.                                                                                  | `true`                                                                                                             |
| `backgroundColor?`        | `string`                                        | The background color of the modal, DefaultHeader, and StatusBar.                                                                                | `#000`     
| `headerTextColor?`        | `string`                                        |  Color of text in the header.                                                                                | `#fff`     
