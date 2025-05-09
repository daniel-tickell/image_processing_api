import express from 'express';
import processImage from '../../processImage.ts';
import {isNumeric, isJpegFilename} from '../../utilities/validateInput.ts';
import logger from '../../utilities/logger.ts';

const images = express.Router();

images.get('/', logger, (req,res) => {
  	const query = req.query;
  	let width: string;
  	let height: string;

if (query.filename && query.width && query.height)
{
 	const filename = query.filename as string;
    height = query.height as string;
    width = query.width as string;
 	let parsedHeight: number = parseInt(height, 10);
 	let parsedWidth: number = parseInt(width, 10);

 	if (isJpegFilename(filename) && isNumeric(query.width) && isNumeric(query.height)) {

		processImage(filename, parsedHeight, parsedWidth);
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
} else {
	console.log('Missing paramters');
	res.send(`<html>parameters missing</html>`)
	}
});



export default images;
