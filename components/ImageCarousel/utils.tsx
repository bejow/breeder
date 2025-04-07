import { SlideItem } from './SlideItem';
import { ImageSourcePropType, ImageStyle, StyleProp } from 'react-native';
import { CarouselRenderItem } from 'react-native-reanimated-carousel';

interface Options {
  images: ImageSourcePropType[];
  style?: StyleProp<ImageStyle>;
  rounded?: boolean;
}

export const renderItem =
  ({ rounded = false, style, images }: Options): CarouselRenderItem<any> =>
  ({ index }: { index: number }) => <SlideItem source={images[index % images.length]} key={index} index={index} rounded={rounded} style={style} />;
