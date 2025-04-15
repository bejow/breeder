import { renderItem } from './utils';
import * as React from 'react';
import { Dimensions, Image, ImageSourcePropType, Pressable, View } from 'react-native';
import { useSharedValue } from 'react-native-reanimated';
import Carousel, { ICarouselInstance, Pagination } from 'react-native-reanimated-carousel';
import { Asset } from 'expo-asset';

const defaultDataWith6Colors = ['#B0604D', '#FF9F9C', '#B3C680', '#5C6265', '#F5D399', '#F1F1F1'];

interface Props {
  images: ImageSourcePropType[];
  onSnapToItem?: (index: number) => void;
  onScrollStart?: () => void;
  onScrollEnd?: () => void;
  onImageClick?: () => void;
}

const PAGE_WIDTH = Dimensions.get('window').width;
const PAGE_HEIGHT = Dimensions.get('window').height;
const ImageCarousel = ({ images, onSnapToItem = (index: number) => {}, onScrollStart = () => {}, onScrollEnd = () => {}, onImageClick = () => {} }: Props) => {
  const scrollOffsetValue = useSharedValue<number>(0);
  const ref = React.useRef<ICarouselInstance>(null);
  const progress = useSharedValue<number>(0);

  const baseOptions = {
    vertical: false,
    width: PAGE_WIDTH -32,
    height: PAGE_WIDTH * 0.6,
  } as const;

  const onPressPagination = (index: number) => {
    ref.current?.scrollTo({
      /**
       * Calculate the difference between the current index and the target index
       * to ensure that the carousel scrolls to the nearest index
       */
      count: index - progress.value,
      animated: true,
    });
  };

  return (
    <View id="carousel-component" style={{ gap: 10, paddingBottom: 32 }}>
      <View style={{ marginBottom: 10 }}>
        <Carousel
          ref={ref}
          loop={true}
          {...baseOptions}
          width={PAGE_WIDTH}
          height={258}
          snapEnabled={true}
          pagingEnabled={true}
          onProgressChange={progress}
          data={images}
          defaultScrollOffsetValue={scrollOffsetValue}
          style={{ width: '100%' }}
          onScrollStart={onScrollStart}
          onScrollEnd={onScrollEnd}
          onConfigurePanGesture={(g: { enabled: (arg0: boolean) => any }) => {
            'worklet';
            g.enabled(false);
          }}
          onSnapToItem={(index: number) => onSnapToItem(index)}
          renderItem={({ index, item }) => {
            return (

 
                <Pressable onPress={onImageClick}>
                  <Image style={{ width: baseOptions.width, height: baseOptions.height }} source={item} resizeMode="contain" />
                </Pressable>

            );
          }}
        />
      </View>

      <Pagination.Custom<ImageSourcePropType>
        progress={progress}
        data={images}
        size={30}
        dotStyle={{
          borderRadius: 16,
          backgroundColor: '#262626',
        }}
        activeDotStyle={{
          borderRadius: 8,
          width: 40,
          height: 30,
          overflow: 'hidden',
          backgroundColor: '#f1f1f1',
        }}
        containerStyle={{
          gap: 5,
          alignItems: 'center',
          height: 10,
          flexWrap: 'wrap',
          justifyContent: 'center',
        }}
        horizontal
        onPress={onPressPagination}
        renderItem={(item) => (
          <Image
            style={{
              width: 40,
              height: 30,
              borderRadius: 5,
              marginHorizontal: 5,
              resizeMode: 'contain',
            }}
            source={item}
          />
        )}
      />
    </View>
  );
};

export default ImageCarousel;
