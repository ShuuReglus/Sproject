import { type ImageSourcePropType } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

type EmojiStickerProps = {
  stickerSource: ImageSourcePropType;
  imageSize: number;
};

export const EmojiSticker = ({
  stickerSource,
  imageSize,
}: EmojiStickerProps) => {
  const scaleImage = useSharedValue(imageSize);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const drag = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: translateX.value },
        { translateY: translateY.value },
      ],
    };
  });

  const imageStyle = useAnimatedStyle(() => ({
    width: withSpring(scaleImage.value),
    height: withSpring(scaleImage.value),
  }));

  const doubleTap = Gesture.Tap()
    .numberOfTaps(2)
    .onStart(() => {
      scaleImage.value =
        scaleImage.value === imageSize ? imageSize * 2 : imageSize;
    });

  return (
    <GestureDetector gesture={Gesture.Simultaneous(drag, doubleTap)}>
      <Animated.View style={[containerStyle, { top: -350 }]}>
        <Animated.Image
          source={stickerSource}
          resizeMode="contain"
          style={imageStyle}
        />
      </Animated.View>
    </GestureDetector>
  );
};
