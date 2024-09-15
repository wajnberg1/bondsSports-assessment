import axios from 'axios';
import { API_KEY, Player } from '../utils/utils';

const API_URL = 'https://api.balldontlie.io/v1/players';

interface PlayerData {
  data: Player[];
  meta: {
    per_page: number;
    next_cursor: number;
  };
}

export const fetchPlayers = async (
  searchQuery: string = ''
): Promise<PlayerData> => {
  try {
    const response = await axios.get(API_URL, {
      params: {
        search: searchQuery,
		per_page: 100
      },
	  headers: {
		'Authorization': API_KEY
	  }
    });
    return response.data;
  } catch (error) {
    throw new Error('Error fetching players data');
  }
};