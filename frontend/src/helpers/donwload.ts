import JSZip from 'jszip';
import { toPng } from 'html-to-image';

/**
 * Converts each direct child of a container element to PNG and downloads them in a zip file.
 * @param container The parent HTMLElement whose children should be converted.
 * @param filename The name of the resulting zip file.
 */
export const downloadChildrenAsPNGsZip = async (
  container: HTMLElement | null,
  // todo: add dataset histogram to zip
  dataset_histogram: HTMLElement | null,
  filename: string = 'images.zip'
): Promise<void> => {
  if (!container) {
    console.error('No container element provided.');
    return;
  }

  const zip = new JSZip();
  const children = Array.from(container.children);

  for (let i = 0; i < children.length; i++) {
    const child = children[i] as HTMLElement;

    // Remove the show labels button
    const elementToHide = child.querySelector('#show-labels-button');
    if (elementToHide) {
      (elementToHide as HTMLElement).style.display = 'none';
    }

    try {
      const dataUrl = await toPng(child, { cacheBust: true });
      const base64 = dataUrl.split(',')[1]; // remove data:image/png;base64,
      zip.file(`rule_${i + 1}.png`, base64, { base64: true });
    } catch (error) {
      console.error(`Failed to convert child ${i + 1} to PNG`, error);
    }
    if (elementToHide) {
      (elementToHide as HTMLElement).style.display = '';
    }
  }

  try {
    const blob = await zip.generateAsync({ type: 'blob' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error('Failed to generate or download zip', error);
  }


};
