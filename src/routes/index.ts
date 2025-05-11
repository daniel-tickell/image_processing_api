import express, {Request, Response} from 'express';
import images from './api/images.ts';

const routes = express.Router();

//Provide a response for if someone uses /api endpoint
routes.get('/', (req: Request, res: Response): void => {
  console.log('main route hit');
  res.send('main api route');
});

//Staticaly serve the thumbs folder from the assets folder.
routes.use('/thumbs', express.static('assets/thumbs'));
//Setup the images endpoint
routes.use('/images', images);

export default routes;
