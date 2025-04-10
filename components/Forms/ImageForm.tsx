import { Asset } from 'expo-media-library';
import { ImagePickerAsset } from 'expo-image-picker';
import { AssetInfo } from 'expo-media-library';
import { Button, View } from 'react-native';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import IconButton from '../IconButton/IconButton';
import styles from './styles.module.scss';
import { CustomIcon } from '../CustomIcon/CustomIcon';
import { useState } from 'react';
import useColorScheme from '../../hooks/useColorScheme';
import Colors from '../../constants/Colors';

interface Props {
  images: Asset[];
  pickImage: (callback: (result: ImagePickerAsset) => void) => void;
  takeImage: (callback: (result: ImagePickerAsset) => void) => void;
  saveImage: (image: string, callback: (asset: AssetInfo) => void, album: string) => void;
  imageAlbum: string;
  onAddImageChange: (asset: AssetInfo) => void;
  removeImage: (image: Asset) => void;
}

const ImageForm = ({ images, pickImage, takeImage, saveImage, onAddImageChange, imageAlbum, removeImage }: Props) => {
  const colorScheme = useColorScheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const [isImageDeletable, setIsImageDeletable] = useState(false);

  const renderCarousel = () => {
    if (images.length > 0) {
      return (
        <View style={styles.carouselContainer}>
          <ImageCarousel
            images={images}
            onScrollStart={() => setIsImageDeletable(false)}
            onSnapToItem={setCurrentImageIndex}
            onImageClick={() => setIsImageDeletable(!isImageDeletable)}
          />
          {isImageDeletable && (
            <View style={{...styles.iconContainer, backgroundColor:Colors[colorScheme].background, borderRadius:5}}>
              <CustomIcon style={{color: Colors[colorScheme].text}} onPress={() => {
                removeImage(images[currentImageIndex])
                setIsImageDeletable(false)
                }} color="blue"  name="trash-can-outline" size={30} />
            </View>
          )}
        </View>
      );
    }
  };

  return (
    <View style={{flex:1}}>
      {renderCarousel()}
    
      <View style={styles.horizontal}>
        <IconButton
          title="TAKE IMAGE"
          onPress={() => takeImage((result: ImagePickerAsset) => saveImage(result.uri, onAddImageChange, imageAlbum))}
          icon="camera-outline"
        />
        <IconButton
          style={{ marginHorizontal: 8 }}
          title="PICK IMAGE"
          onPress={() => pickImage((result: ImagePickerAsset) => saveImage(result.uri, onAddImageChange, imageAlbum))}
          icon="image-outline"
        />
      </View>
    </View>
  );
};
export default ImageForm;
