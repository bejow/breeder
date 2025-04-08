import { Asset } from "expo-asset";
import { ImagePickerAsset } from "expo-image-picker";
import { AssetInfo } from "expo-media-library";
import { Button, View } from "react-native";


interface Props {
    pickImage: (callback: (result: ImagePickerAsset) => void) => void,
    takeImage: (callback: (result: ImagePickerAsset) => void) => void,
    saveImage: (image: string, callback: (asset: AssetInfo) => void, album: string ) => void
    imageAlbum: string,
    onAddImageChange: (asset: AssetInfo) => void

}

const ImageForm = ({pickImage, takeImage, saveImage, onAddImageChange, imageAlbum}: Props) => (
  <View>

    <Button onPress={() => pickImage((result: ImagePickerAsset) => saveImage(result.uri, onAddImageChange, imageAlbum))} title={'Pick Photo'} />
    <Button onPress={() => takeImage((result: ImagePickerAsset) => saveImage(result.uri, onAddImageChange, imageAlbum))} title={'Take Photo'} />
  </View>
);

export default ImageForm