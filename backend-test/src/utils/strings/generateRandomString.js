https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range

/**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
function getRandomInt(min, max) {

    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateRandomString = (length=25) => {
    
    const alp = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    //length = 62, start_i = 0 ("a"), end_i = 61 ("9"), tested
    var res = ""
    for (var i = 0; i < length;i++) {
        res += alp[getRandomInt(0,62)]
    }
    return res

}


module.exports = {generateRandomString}