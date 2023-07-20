import { v4 } from "uuid";
import { storage } from "./FirebaseConfig";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const firebase_single_upload = async (file) => {
  const imageRef = ref(storage, `userAssets/${file.name + v4()}`);
  let snapshot = await uploadBytes(imageRef, file);
  let uploadUrl = await getDownloadURL(snapshot.ref);
  return (
    uploadUrl + `_assetType:${file.type.includes("image") ? "img" : "video"}`
  );
};

export const firebase_multiple_upload = async (listFile) => {
  let tempArr = [];

  for (let i = 0; i < listFile.length; i++) {
    const element = listFile[i];
    let url = await firebase_single_upload(element);
    tempArr.push(url);
  }
  return tempArr;
};
