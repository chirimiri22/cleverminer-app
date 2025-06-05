import JSZip from "jszip";

export function downlaodZipClmImages(images: string[]) {
  const zip = new JSZip();

  images.forEach((base64String, index) => {
    // Add each base64 image as a .png file to the zip
    zip.file(`image_${index + 1}.png`, base64String, { base64: true });
  });

  zip.generateAsync({ type: 'blob' }).then((content) => {
    const link = document.createElement('a');
    link.href = URL.createObjectURL(content);
    link.download = 'images.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
}
