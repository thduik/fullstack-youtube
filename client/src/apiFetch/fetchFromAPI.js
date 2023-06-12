import axios from 'axios';
import { processResData } from './utils';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com' //'https://youtube-v3-alternative.p.rapidapi.com' // 'https://youtube-v31.p.rapidapi.com';


const options = {
  params: {
    maxResults: 10,
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
      const searchUrl = baseUrl + `/youtube/video/search/?q=${keyword}&type=video`
      const res = await axios.get(searchUrl)
      // console.log("searchVideosFromApiYoutube success", res.data)
      console.log("videoData is",res.data.items[0])
      const res2 = processResData(res)
      return res2.data
  } catch (err) {
      throw("searchVideosFromApiYoutube err", err)
  }

}



