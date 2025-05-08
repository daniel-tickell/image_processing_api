function isNumeric(value: any) {
    return /^-?\d+$/.test(value);
}

function isJpegFilename(value: any) {
	let lowerFilename = value.toLowerCase();
	return lowerFilename.endsWith('.jpg') || lowerFilename.endsWith('.jpeg');
}

export {isNumeric, isJpegFilename};
