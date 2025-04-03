import { getInfoAsync, readAsStringAsync, StorageAccessFramework } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { imageDirectory } from '../constants/Image';
import { PermissionsAndroid } from 'react-native';

// export const requestStoragePermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE, {
//       title: 'Permission title',
//       message: 'Permission message',
//       buttonNeutral: 'Ask Me Later',
//       buttonNegative: 'Cancel',
//       buttonPositive: 'OK',
//     });
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       // use local storage
//     } else {
//       // permission denied
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };
export const requestPermissions = async () => {
  const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
  if (status === 'granted') {
    return true
  } else {
    alert('Permission to access media library is required!');
    return false
  }
};

export const pickImage =  async(callback: (result: ImagePicker.ImagePickerAsset) => void) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: "images",
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  if (!result.canceled) {
    callback(result.assets[0]);
    console.log("Images picked:", result.assets[0])
    return result.assets[0];
  }
  else {
    alert('You did not select any image.');
  }
};

export const takeImage = async (callback: (result: ImagePicker.ImagePickerAsset) => void) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });

  if (!result.canceled) {
    callback(result.assets[0]);
    return result;
  }
};

const getLatestFile = async (album: MediaLibrary.Album) => {
  const assets = await MediaLibrary.getAssetsAsync({ album: album, first: 1, sortBy: 'creationTime' });
  return assets.assets[0];
};


export const saveImage = async (tempImageUri: string, callback: (asset: MediaLibrary.Asset) => void) => {
  const permission = await MediaLibrary.getPermissionsAsync();
  console.log("saveImage", tempImageUri)
  console.log("Permission: ", permission.granted)
  if (permission.granted == false) {
    await MediaLibrary.requestPermissionsAsync();
  }

  try {
    // Create asset from Camera
    const file = await MediaLibrary.createAssetAsync(tempImageUri);

    //check for album existence
    var album = await MediaLibrary.getAlbumAsync(imageDirectory);

    if (!album){
      // if not existent --> create new
      album = await MediaLibrary.createAlbumAsync(imageDirectory, file, true)
      callback(file)
      return file
    }
    else {
      const assets = await MediaLibrary.getAssetsAsync({album, mediaType:MediaLibrary.MediaType.photo})
      const existingImage = assets.assets.find((asset) => asset.uri === tempImageUri)
      
      if (existingImage){
        callback(existingImage)
        return existingImage
      }

      // Create a new asset from the renamed file
      const asset = await MediaLibrary.createAssetAsync(tempImageUri);
      var isAdded = await MediaLibrary.addAssetsToAlbumAsync([file], album.id, true);
      callback(file)
      return file

    }
  } catch (e) {
    alert("Error while saving image.")
  }
};
