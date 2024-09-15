import axios from 'axios';


const API_URL = 'http://localhost:5000/api/stats'; // Backend URL

export const fetchStats = async (id: number) => {
  const response = await axios.get(API_URL, {
    params: {
      id,
    }
  });
  return response.data;
};