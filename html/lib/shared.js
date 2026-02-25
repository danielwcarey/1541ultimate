// shared.js
export function isHexadecimal(str)
{
    const regexp = /^[0-9a-fA-F]+$/;
  
    if (regexp.test(str))
        return true;
    else
        return false;

}

export function toHex16(num) {
    return num.toString(16).padStart(4, '0').toUpperCase();
}

export function toHex8(num) {
    return num.toString(16).padStart(2, '0').toUpperCase();
}

export function hexToInt(hexString) {
    return parseInt(hexString, 16);
}

export function areAllValuesInRange(hexArray) {
    for (let hex of hexArray) {
        let value = parseInt(hex, 16); // Convert hex to decimal
        if (value < 0 || value > 255) {
            return false; // Value is out of range
        }
    }
    return true; // All values are in range
}

export function hex_increment(hex_str, increment=8) {
    return (parseInt(hex_str, 16) + increment).toString(16).padStart(4, '0');
}

export function format_bytes_as_hex_and_ascii(byteData) {
    const hexContent = [];
    const asciiContent = [];

    for (const byte of byteData) {
        hexContent.push(byte.toString(16).padStart(2, '0'));

        // Printable ASCII characters are in the range 32 to 126
        if (byte >= 32 && byte <= 126) {
            asciiContent.push(String.fromCharCode(byte));
        } else {
            asciiContent.push('.');
        }
    }

    return [hexContent.join(' '), asciiContent.join('')];
}

export function findConsecutiveValues(byteArray, valuesToFind, startIndex, endIndex) {
    const indices = [];
    const sequenceLength = valuesToFind.length;

    // Ensure start and end indices are within the array bounds
    startIndex = Math.max(startIndex, 0);
    endIndex = Math.min(endIndex, byteArray.length - sequenceLength);

    for (let i = startIndex; i <= endIndex; i++) {
        let match = true;
        for (let j = 0; j < sequenceLength; j++) {
            if (byteArray[i + j] !== valuesToFind[j]) {
                match = false;
                break;
            }
        }
        if (match) {
            indices.push(i);
        }
    }

    return indices;
}
