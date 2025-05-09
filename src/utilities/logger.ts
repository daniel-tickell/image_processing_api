import express from 'express';

const logger = (req: express.Request, res: express.Response, next: express.NextFunction):
void => {
	const url = req.url;
	const args = req.query
	console.log(`${url} was visited`);
	console.log(`${args.filename} was supplied as filename`);
	console.log(`${args.width} was supplied as width`);
	console.log(`${args.height} was supplied as height`);
	next();
}


export default logger;