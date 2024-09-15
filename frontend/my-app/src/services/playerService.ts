import axios from 'axios';


const API_URL = 'http://localhost:5000/api/players'; // Backend URL

export const fetchPlayers = async (searchQuery: string) => {
  const response = await axios.get(API_URL, {
    params: {
      searchQuery,
    }
  });
  return response.data;
};