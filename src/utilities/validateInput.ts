function isNumeric(value) {
    return /^-?\d+$/.test(value);
}

function isJpegFilename(value: string | undefined) {
	if (typeof value === 'string'){
		const lowerFilename = value.toLowerCase();
		return lowerFilename.endsWith('.jpg') || lowerFilename.endsWith('.jpeg');
	} else {
		return false
	}
}

export {isNumeric, isJpegFilename};
