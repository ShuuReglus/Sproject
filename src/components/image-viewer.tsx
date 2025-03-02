import { forwardRef, type FC } from "react";
import { Image, StyleSheet, type ImageSourcePropType } from "react-native";

type ImageViewerProps = {
  placeholderImageSource: ImageSourcePropType;
  selectedImage: string | null;
};

export const ImageViewer = forwardRef<Image, ImageViewerProps>(
  ({ placeholderImageSource, selectedImage }, ref) => {
    const imageSource = selectedImage
      ? { uri: selectedImage }
      : placeholderImageSource;

    return <Image ref={ref} source={imageSource} style={styles.image} />;
  },
);
ImageViewer.displayName = "ImageViewer";

const styles = StyleSheet.create({
  image: {
    width: 320,
    height: 440,
    borderRadius: 18,
  },
});
