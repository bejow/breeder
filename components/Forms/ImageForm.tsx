import { Asset } from 'expo-media-library';
import { ImagePickerAsset } from 'expo-image-picker';
import { AssetInfo } from 'expo-media-library';
import { Button, View } from 'react-native';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import IconButton from '../IconButton/IconButton';
import styles from './styles.module.scss';

interface Props {
  images: Asset[];
  pickImage: (callback: (result: ImagePickerAsset) => void) => void;
  takeImage: (callback: (result: ImagePickerAsset) => void) => void;
  saveImage: (image: string, callback: (asset: AssetInfo) => void, album: string) => void;
  imageAlbum: string;
  onAddImageChange: (asset: AssetInfo) => void;
}

const ImageForm = ({ images, pickImage, takeImage, saveImage, onAddImageChange, imageAlbum }: Props) => (
  <View>
    {images.length > 0 && <ImageCarousel images={images} />}
    <View style={styles.horizontal}>
      <IconButton
        title="TAKE IMAGE"
        onPress={() => takeImage((result: ImagePickerAsset) => saveImage(result.uri, onAddImageChange, imageAlbum))}
        icon="camera-outline"
      />
      <IconButton
      style={{marginHorizontal:8}}
        title="PICK IMAGE"
        onPress={() => pickImage((result: ImagePickerAsset) => saveImage(result.uri, onAddImageChange, imageAlbum))}
        icon="image-outline"
      />
    </View>

  </View>
);

export default ImageForm;
