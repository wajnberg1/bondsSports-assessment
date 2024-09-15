import axios from 'axios';
import { API_KEY, Stat } from '../utils/utils';

const API_URL = 'https://api.balldontlie.io/v1/stats';

interface StatData {
  data: Stat[];
  meta: {
    per_page: number;
    next_cursor: number;
  };
}

export const fetchStats = async (
  id: number = 0
): Promise<StatData> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        player_ids: [id],
		per_page: 100
      },
	  headers: {
		'Authorization': API_KEY
	  }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching stats:', error);
    throw new Error('Error fetching stats data');
  }
};