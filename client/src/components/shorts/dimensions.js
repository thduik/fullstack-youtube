export const shortHeight = 'calc(100vh - 128px)'
export const shortWidth = 'calc(56.25vh - 72px)'
export const shortMarginTop = '25px'
export const shortMarginBottom = '25px'


 //shortHeight + shortMarginTop + shortMarginBottom
export const heightPerShort = (innerHeight) => innerHeight - 128 
export const calcVideoPlayerHeight = (innerHeight) => {console.log('calcVideoPlayerHeight', innerHeight);  return innerHeight - 128 }
