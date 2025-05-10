import sharp from 'sharp';
import fs from 'fs';

async function processImage(
  fileName: string,
  height: number,
  width: number,
): Promise<string> {
  let response: string;
  const imgFiles: string[] = fs.readdirSync('./assets/images/');
  const thmbFiles: string[] = fs.readdirSync('./assets/thumbs/');
  const outFile = `thumb_w${width}_h${height}_${fileName}`;

  if (imgFiles.includes(fileName)) {
    console.log(`Src image ${fileName} found`);
    if (!thmbFiles.includes(outFile)) {
      console.log('thumb not found, processing image');
      await sharp(`./assets/images/${fileName}`)
        .resize(width, height)
        .toFile(`./assets/thumbs/${outFile}`);
    } else {
      console.log('Thumbnail Already Exists');
    }
    response = outFile;
  } else {
    console.log(`${fileName} not found`);
    response = `Source file ${fileName} not found`;
  }
  return response;
}

export default processImage;
