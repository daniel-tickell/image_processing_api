import sharp from 'sharp';
import fs from 'fs';
const processImage = (fileName, height, width) => {
    let response;
    const imgFiles = fs.readdirSync('./assets/images/');
    const thmbFiles = fs.readdirSync('./assets/thumbs/');
    if (imgFiles.includes(fileName)) {
        console.log(`Src image ${fileName} found`);
        if (!thmbFiles.includes(`thumb_${fileName}`)) {
            console.log('thumb not found, processing image');
            sharp(`./assets/images/${fileName}`)
                .resize(width, height)
                .toFile(`./assets/thumbs/thumb_${fileName}`);
        }
        else {
            console.log('Thumbnail Already Exists');
        }
        response = `<img src = "/api/thumbs/thumb_${fileName}">`;
    }
    else {
        console.log(`${fileName} not found`);
        response = `Source file ${fileName} not found`;
    }
    return response;
};
export default processImage;
