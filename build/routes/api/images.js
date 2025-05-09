import express from 'express';
import processImage from "../../utilities/processImage.js";
import { isNumeric, isJpegFilename } from "../../utilities/validateInput.js";
import logger from "../../utilities/logger.js";
const images = express.Router();
//Use the logger for requests
images.get('/', logger, (req, res) => {
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
        if (isJpegFilename(filename) && isNumeric(parsedWidth) && isNumeric(parsedHeight)) {
            //Call the process image function passing the filename, width and height
            const imageResponse = processImage(filename, parsedHeight, parsedWidth);
            // Log Successful Parameters
            console.log('Valid parameters provided');
            //Send image success message, and link to the new image
            res.send(`<html>Valid Parameters provided 
		 	<p> filename = ${query.filename} Valid:${isJpegFilename(filename)} 
		 	<p> width = ${query.width} Valid: ${isNumeric(query.width)} 
			<p> height = ${query.height} Valid: ${isNumeric(query.height)}
			<p> ${imageResponse}
			</html>`);
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
});
export default images;
