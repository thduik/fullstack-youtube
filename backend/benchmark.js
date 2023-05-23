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


const testlolol = () => {
    const res = {a:'e'}
    modifyRes(res)
    console.log("res is", res)
}
const modifyRes = (obj) => {
    obj.a = {}
    obj.b = 'bbbbb'
}
testlolol()