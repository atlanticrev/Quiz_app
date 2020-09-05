/**
 * Util function
 * @param {number} start
 * @param {number} stop
 * @return {number}
 */
function randomInt (start, stop) {
    return Math.floor(Math.random() * ((stop + 1) - start) + start);
}

export { randomInt };