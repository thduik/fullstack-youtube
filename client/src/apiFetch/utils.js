export const processResData = (res) => {
    for (var i = 0;i<res.data.items.length;i++) {
      res.data.items[i].channelTitle = decodeHtml(res.data.items[i].channelTitle)
      res.data.items[i].description = decodeHtml(res.data.items[i].description)
      res.data.items[i].title = decodeHtml(res.data.items[i].title)
    }
    return res
  }



export const decodeHtml = (text) => {
    var txt = document.createElement("textarea");
    txt.innerHTML = text;
    return txt.value;
  }