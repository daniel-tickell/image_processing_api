import express from 'express';
import images from './api/images.js';

const routes = express.Router();

routes.get('/', (req,res)=> {
	console.log("main route hit");
	res.send('main api route');
});

routes.use('/images', images);

export default routes;