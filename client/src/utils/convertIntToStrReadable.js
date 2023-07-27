const convertIntToStrReadable = (num) => {
    console.log('typeof num',typeof num)
    if (!(typeof num)=='number' ) { return null}
    let s = null
    if (num < 1000) { return `${num}`}
    if (num < 1000000) {let res = num/1000; return `${Math.round(res*10)/10}K`}
    if (num < 1000000000) {let res = num/1000000; return `${Math.round(res*10)/10}M`}
    if (num < 1000000000000) {let res = num/1000000000; return `${Math.round(res*10)/10}B`}
    return s
}



// const test1 = () => {
//     console.log('test1', convertIntToStrReadable(129324))
//     console.log('test2', convertIntToStrReadable(129324323))
//     console.log('test2', convertIntToStrReadable(42932423233))
// }

// test1()


export default convertIntToStrReadable;