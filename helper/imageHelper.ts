import { getInfoAsync, readAsStringAsync, StorageAccessFramework } from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import * as MediaLibrary from 'expo-media-library';
import { imageDirectory } from '../constants/Image';
import { PermissionsAndroid } from 'react-native';


export const requestStoragePermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
      {
        title: "Permission title",
        message:
          "Permission message",
        buttonNeutral: "Ask Me Later",
        buttonNegative: "Cancel",
        buttonPositive: "OK",
      }
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("You can use the EXTERNAL_STORAGE");
    } else {
      console.log("EXTERNAL_STORAGE permission denied");
    }
  } catch (err) {
    console.warn(err);
  }
};

export const pickImage = async (callback: (result: ImagePicker.ImageInfo) => void) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log(result);
  if (!result.cancelled) {
    callback(result);
    return result;
  }
};

export const takeImage = async (callback: (result: ImagePicker.ImageInfo) => void) => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchCameraAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    aspect: [4, 3],
    quality: 1,
  });
  console.log(result);
  if (!result.cancelled) {
    callback(result);
    return result;
  }
};

const getLatestFile = async (album: MediaLibrary.Album) => {
  const assets = await MediaLibrary.getAssetsAsync({album: album, first:1, sortBy: "creationTime"})
  return assets.assets[0]
}

export const saveImage = async (tempImageUri: string, callback: (asset: MediaLibrary.Asset) => void) => {
  const permission = await MediaLibrary.getPermissionsAsync()
  if (permission.granted == false){
    await MediaLibrary.requestPermissionsAsync()
  }

  // create timestamp for unique name
  const timestamp = new Date(Date.now()).toISOString();

  try {
    // Create asset from Camera
    const file = await MediaLibrary.createAssetAsync(tempImageUri)

    //check for album existence
    var album = await MediaLibrary.getAlbumAsync(imageDirectory)
    var assetInfo = await MediaLibrary.getAssetInfoAsync(file)

    console.log("ASSETINFO:", assetInfo)
    console.log("FILE URI:", file.uri)
    console.log("ALBUM URI:", album)

    if (album === null){
      // if not existent --> create new
      album = await MediaLibrary.createAlbumAsync(imageDirectory, file, false)
      const newFile = await getLatestFile(album)
      callback(newFile)
    }
    else {
      // if album exists just save it there
      var createdFile = await MediaLibrary.addAssetsToAlbumAsync(file, album, false)
      const newFile = await getLatestFile(album)

      callback(newFile)
    }   
  } catch (e) {
    console.log('ERROR!!!', e);
  }
};
