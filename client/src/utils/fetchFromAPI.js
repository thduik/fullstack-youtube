import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {

  
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log("fetchFromAPI success url is", url, "data is", data )
    return data;
  } catch(err) {
    console.log("fetchFromAPI fail: ", err)
  }
};

export const searchVideosFromApiYoutube = async (keyword = "lol") => {
  
  const baseUrl = import.meta.env.VITE_BASE_API_URL
  console.log("baseUrl is", baseUrl)
  try {
      const searchUrl = baseUrl + `/youtube/video/search/?q=${keyword}&limit=5&type=video`
      const res = await axios.get(searchUrl)
      // console.log("searchVideosFromApiYoutube success", res.data)
      return res.data
  } catch (err) {
      throw("searchVideosFromApiYoutube err", err)
  }

}

