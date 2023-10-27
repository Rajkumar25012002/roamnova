const convertToImageFile = (base64Image, index) => {
  const base64Data = base64Image.split(",")[1];

  const byteString = window.atob(base64Data);
  const byteArray = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    byteArray[i] = byteString.charCodeAt(i);
  }

  const blob = new Blob([byteArray], { type: "image/jpeg" });
  const file = new File([blob], `image${index + 1}.jpg`, {
    type: "image/jpeg",
  });
  return file;
};
export default convertToImageFile;
