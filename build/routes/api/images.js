import express from 'express';
import processImage from "../../processImage.js";
import { isNumeric, isJpegFilename } from "../../utilities/validateInput.js";
import logger from "../../utilities/logger.js";
const images = express.Router();
images.get('/', logger, (req, res) => {
    const query = req.query;
    let width;
    let height;
    if (query.filename && query.width && query.height) {
        const filename = query.filename;
        height = query.height;
        width = query.width;
        let parsedHeight = parseInt(height, 10);
        let parsedWidth = parseInt(width, 10);
        if (isJpegFilename(filename) && isNumeric(query.width) && isNumeric(query.height)) {
            processImage(filename, parsedHeight, parsedWidth);
            console.log('Valid parameters provided');
            res.send(`<html>Valid Parameters provided 
	 	<p> filename = ${query.filename} Valid:${isJpegFilename(filename)} 
	 	<p> width = ${query.width} Valid: ${isNumeric(query.width)} 
		<p> height = ${query.height} Valid: ${isNumeric(query.height)}
		</html>`);
        }
        else {
            console.log('Invalid parameters provided');
            res.send(`<html><b>Invalid</b> Parameters provided 
	 	<p> filename = ${query.filename} Valid:${isJpegFilename(filename)} 
	 	<p> width = ${query.width} Valid: ${isNumeric(query.width)} 
		<p> height = ${query.height} Valid: ${isNumeric(query.height)}
		</html>`);
        }
    }
    else {
        console.log('Missing paramters');
        res.send(`<html>parameters missing</html>`);
    }
});
export default images;
