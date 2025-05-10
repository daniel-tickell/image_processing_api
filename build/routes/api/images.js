var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import express from 'express';
import processImage from "../../utilities/processImage.js";
import path from 'path';
import { isNumeric, isJpegFilename } from "../../utilities/validateInput.js";
import logger from "../../utilities/logger.js";
const images = express.Router();
const __dirname = path.dirname(process.argv[1]);
//Use the logger for requests
images.get('/', logger, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query;
    let width;
    let height;
    // Check that paramaters were supplied in the URL
    if (query.filename && query.width && query.height) {
        //define blank variables for params
        const filename = query.filename;
        height = query.height;
        width = query.width;
        //Parse the width and height to integers
        const parsedHeight = parseInt(height, 10);
        const parsedWidth = parseInt(width, 10);
        //Check for valid filename and width/height
        if (isJpegFilename(filename) &&
            isNumeric(query.width) &&
            isNumeric(query.height)) {
            //Call the process image function passing the filename, width and height
            const imageResponse = yield processImage(filename, parsedHeight, parsedWidth);
            // Log Successful Parameters
            console.log('Valid parameters provided');
            res.sendFile(imageResponse, {
                root: path.join(__dirname, '../assets', 'thumbs'),
            });
        }
        else {
            // Send invalid params message
            console.log('Invalid parameters provided');
            res.send(`<html><b>Invalid</b> Parameters provided 
		 	<p> filename = ${query.filename} Valid:${isJpegFilename(filename)} 
		 	<p> width = ${query.width} Valid: ${isNumeric(query.width)} 
			<p> height = ${query.height} Valid: ${isNumeric(query.height)}
			</html>`);
        }
    }
    else {
        //Send the no params message
        console.log('Missing paramters');
        res.send(`<html>parameters missing</html>`);
    }
}));
export default images;
