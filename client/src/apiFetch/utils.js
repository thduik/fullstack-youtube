export const processResData = (reslolData) => {
  const videoArr = reslolData.items
  const newRes = {...reslolData}
  const resArr = []
    for (var i = 0;i<videoArr.length;i++) {
      var newO = {...videoArr[i]}
      newO.channelTitle = decodeHtml(newO.channelTitle)
      newO.description = decodeHtml(newO.description)
      newO.title = decodeHtml(newO.title)
      resArr.push(newO)
    }
    newRes.items = resArr
    return newRes
  }



export const decodeHtml = (text) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  }