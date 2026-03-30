import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "@/lib/firebase";

export async function uploadListingImage(file) {
  if (!file) {
    throw new Error("No image file selected.");
  }

  const fileName = `${Date.now()}-${file.name}`;
  const storageRef = ref(storage, `listings/${fileName}`);

  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);

  return downloadURL;
}