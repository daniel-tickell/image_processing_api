import express from 'express';
import processImage from '../../processImage.ts';
import {isNumeric, isJpegFilename} from '../../utilities/validateInput.ts';
import logger from '../../utilities/logger.ts';
import {promises as fsPromises} from 'fs';
const images = express.Router();


images.get('/', logger, (req,res) => {
  	const query = req.query;
 	const filename = query.filename as string;
 	let height: number;
 	let width: number; 

 	if (isJpegFilename(filename) && isNumeric(query.height) && isNumeric(query.width)) {
 		height = parseInt(query.height, 10);
 		width = parseInt(query.width, 10);
		processImage(filename, height, width);
		console.log('Valid parameters provided');
		res.send(`<html>Valid Parameters provided 
	 	<p> filename = ${query.filename} Valid:${isJpegFilename(filename)} 
	 	<p> width = ${query.width} Valid: ${isNumeric(query.width)} 
		<p> height = ${query.height} Valid: ${isNumeric(query.height)}
		</html>`);
		} else {
		console.log('Invalid parameters provided');
		res.send(`<html><b>Invalid</b> Parameters provided 
	 	<p> filename = ${query.filename} Valid:${isJpegFilename(filename)} 
	 	<p> width = ${query.width} Valid: ${isNumeric(query.width)} 
		<p> height = ${query.height} Valid: ${isNumeric(query.height)}
		</html>`);
		}
	
 	//const imgaeProcess = async ():Promise<void> => {processImage(filename, height, width)};

});



export default images;
