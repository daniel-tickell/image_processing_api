const logger = (req, res, next) => {
    const url = req.url;
    const args = req.query;
    console.log(`${url} was visited`);
    console.log(`${args.filename} was supplied as filename`);
    console.log(`${args.width} was supplied as width`);
    console.log(`${args.height} was supplied as height`);
    next();
};
export default logger;
