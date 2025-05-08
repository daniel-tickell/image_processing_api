//import sharp from 'sharp';


const processImage = (fileName: string , height: number, width: number) => {
	console.log("from ProcessImage Function");
	console.log(typeof fileName);
	console.log(fileName);

	console.log(typeof height);
	console.log(height);
	console.log(typeof width);
	console.log(width);

	//sharp(fileName)
	//.resize(newWidth,newHeight)
	//.toFile(`thumbs/thumb_${fileName}`);
};

export default processImage;