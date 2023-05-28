// const { generateRandomString } = require("./src/utils/strings/generateRandomString");

// var myMap = new Map();

// const test_count = 1 * Math.pow(10, 6)//10 thousand




// const testlol = async () => {
//     const startTime = Date.now()
//     for (var i = 0; i <  test_count; i++) {
//        const res = generateRandomString(30)
//     }

//     console.log("test took", Date.now() - startTime, "ms")
// }

const maplol = new Map()
maplol.set('a','b')
const testlolol = () => {
    console.log(maplol.get('b'))
    if (!maplol.get('b')) {
        console.log("YESS  UFCKKCK")
    }
}
const modifyRes = (obj) => {
    obj.a = {}
    obj.b = 'bbbbb'
}
testlolol()