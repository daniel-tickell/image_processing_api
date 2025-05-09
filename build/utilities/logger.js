const logger = (req, res, next) => {
    let url = req.url;
    let args = req.query;
    console.log(`${url} was visited`);
    console.log(`${args.filename} was supplied as filename`);
    console.log(`${args.width} was supplied as width`);
    console.log(`${args.height} was supplied as height`);
    next();
};
export default logger;
