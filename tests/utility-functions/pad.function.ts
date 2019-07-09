/** add extra zeros to number if needed */
export function pad(numberStr: string, max: number) {
    return numberStr.length < max ? pad("0" + numberStr, max) : numberStr;
}