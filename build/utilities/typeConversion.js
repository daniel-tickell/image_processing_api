function convertToInt(value, defaultValue) {
    let numberValue;
    if (typeof value === 'string') {
        numberValue = parseInt(value, 10);
    }
    else if (typeof value === 'number' && Number.isInteger(value)) {
        numberValue = value;
    }
    else {
        if (defaultValue !== undefined) {
            return defaultValue;
        }
        numberValue = NaN;
    }
    return numberValue;
}
export default convertToInt;
