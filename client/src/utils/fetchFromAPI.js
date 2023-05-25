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

export const searchGetFromApi = async (keyword) => {
  try {
    const res = await axios.get(`https://www.youtube.com/results?search_query=${keyword}`)
    console.log("searchGetFromApi success", res.data)
  } catch (err) {
    console.log("searchGetFromApi err", err)
  }
}
