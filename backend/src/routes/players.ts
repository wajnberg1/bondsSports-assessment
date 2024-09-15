import { Router, Request, Response } from 'express';
import { fetchPlayers } from '../services/nbaService';

const router = Router();

// Fetch players with optional search query
router.get('/', async (req: Request, res: Response) => {
  const { searchQuery } = req.query;

  try {
    const data = await fetchPlayers(      
      searchQuery?.toString() || ''
    );
    res.json(data);
  } catch (error) {
    console.error('Error fetching players:', error);
    res.status(500).json({ error: 'Failed to fetch players' });
  }
});

export default router;