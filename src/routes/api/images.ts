import express from 'express';
//import processImage from '../../processImage';
import convertToInt from '../../utilities/typeConversion.js';
const images = express.Router();


images.get('/', (req,res) => {
  	const query = req.query;
 	const filename = query.filename as string;
 	let height: number;
 	let width: number; 
 	console.log(filename);
 	if (typeof query.height !== 'number') {
 		height = convertToInt(query.height);
 		console.log(height);
 	}
 	if (typeof query.width !== 'number') {
 		width = convertToInt(query.width);
 		console.log(width);
 	}


 	//const imgaeProcess = async ():Promise<void> => {processImage(filename, height, width)};
	res.send("Images Route");
});



export default images;
