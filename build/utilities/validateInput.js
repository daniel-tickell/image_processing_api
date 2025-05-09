function isNumeric(value) {
    return /^-?\d+$/.test(value);
}
function isJpegFilename(value) {
    if (typeof value === 'string') {
        let lowerFilename = value.toLowerCase();
        return lowerFilename.endsWith('.jpg') || lowerFilename.endsWith('.jpeg');
    }
    else {
        return false;
    }
}
export { isNumeric, isJpegFilename };
