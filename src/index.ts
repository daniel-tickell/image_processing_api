import express from 'express';
import routes from './routes/index.ts';

//Define express app and port
const app = express();
const port = 3000;

//Tell express to use the routes
app.use('/api', routes);


//start the server and log a message to console
app.listen(port, () => {
	console.log(`Server started at http://127.0.0.1:${port}`);
});

export default app;