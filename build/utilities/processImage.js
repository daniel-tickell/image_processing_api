var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import sharp from 'sharp';
import fs from 'fs';
function processImage(fileName, height, width) {
    return __awaiter(this, void 0, void 0, function* () {
        let response;
        const imgFiles = fs.readdirSync('./assets/images/');
        const thmbFiles = fs.readdirSync('./assets/thumbs/');
        const outFile = `thumb_w${width}_h${height}_${fileName}`;
        if (imgFiles.includes(fileName)) {
            console.log(`Src image ${fileName} found`);
            if (!thmbFiles.includes(outFile)) {
                console.log('thumb not found, processing image');
                yield sharp(`./assets/images/${fileName}`)
                    .resize(width, height)
                    .toFile(`./assets/thumbs/${outFile}`);
            }
            else {
                console.log('Thumbnail Already Exists');
            }
            response = outFile;
        }
        else {
            console.log(`${fileName} not found`);
            response = `Source file ${fileName} not found`;
        }
        return response;
    });
}
export default processImage;
