// lib/cloudinary.js
const CLOUD_NAME = "dkftsg7ck";
const UPLOAD_PRESET = "rsu-housing";

export async function uploadToCloudinary(file) {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const resourceType = file.type.startsWith("video") ? "video" : "image";

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/" + CLOUD_NAME + "/" + resourceType + "/upload",
    { method: "POST", body: formData }
  );

  const data = await res.json();

  if (!data.secure_url) {
    throw new Error("Upload failed");
  }

  return data.secure_url;
}