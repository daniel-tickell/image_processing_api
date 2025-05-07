import express from 'express';
import routes from './routes/index.js';

const app = express();
const port = 3000;

app.use('/api', routes);

app.listen(port, () => {
	console.log(`Server started at http://127.0.0.1:${port}`);
});

export default app;