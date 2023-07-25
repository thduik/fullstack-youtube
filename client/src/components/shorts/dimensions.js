export const mainPaddingTop = '0px'

const shortMarginTopInt = 5
const shortMarginBottomInt = 35


//calculated vars
export const shortHeight = 'calc(100vh - 128px)'
export const shortWidth = 'calc(56.25vh - 72px)'
export const shortMarginTop = `${shortMarginTopInt}px`
export const shortMarginBottom = `${shortMarginBottomInt}px`


 //shortHeight + shortMarginTop + shortMarginBottom
export const heightPerShort = (innerHeight) => innerHeight - 128 + shortMarginTopInt + shortMarginBottomInt
export const calcVideoPlayerHeight = (innerHeight) => {console.log('calcVideoPlayerHeight', innerHeight);  return innerHeight - 128 }
