import axios from 'axios';

export const BASE_URL = 'https://youtube-v31.p.rapidapi.com';

const options = {
  params: {
    maxResults: 50,
  },
  headers: {
    // 'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
    'X-RapidAPI-Key': 'e5255cd7e3mshb0fecff923ab3b2p194ad3jsnc5e0bee7fae3',
    'X-RapidAPI-Host': 'youtube-v31.p.rapidapi.com',
  },
};

export const fetchFromAPI = async (url) => {
  try {
    const { data } = await axios.get(`${BASE_URL}/${url}`, options);
    console.log("fetchFromAPI success: ", data, )
    return data;
  } catch(err) {
    console.log("fetchFromAPI fail: ", err)
  }
  
  
};
