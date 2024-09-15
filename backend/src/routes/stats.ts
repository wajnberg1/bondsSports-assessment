import { Router, Request, Response } from 'express';
import { fetchStats } from '../services/statService';
import { Stat, statFields } from '../utils/utils';

const router = Router();
var cacheStats: Stat[] = [];

// Fetch stats with mandatory player id
router.get('/', async (req: Request, res: Response) => {
  const { id } = req.query;
  
  if (!id) {
	res.status(500).json({ error: 'missing id parameter' });
	return;
  }
  
  const numberId = parseInt(id?.toString() || '');
  
  if (cacheStats[numberId] !== undefined) {
    res.json(cacheStats[numberId]);
	return;
  }

  try {
    const data = await fetchStats(      
      numberId
    );
	const average: Stat = computeAverageForEachStat(data.data);
	cacheStats[numberId] = average;
    res.json(average);
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
});

function computeAverageForEachStat(stats: Stat[]): Stat {
    if (stats.length === 0) return {} as Stat;

    const totals: Stat = {} as Stat;

    let key: keyof Stat;
	
    // Sum all values for each key
    stats.forEach(stat => {
        for(key in stat) {
			if (statFields.includes(key)) {
			  if (totals[key] === undefined) {
                totals[key] = 0;
			  }
              totals[key] += stat[key];
			}
        };
    });

    // Compute the average for each key
    const averages: Stat = {} as Stat;
    for(key in totals)  {
        averages[key] = totals[key] / stats.length;
		averages[key] = Math.round(averages[key] * 100) / 100;
    };

    return averages;
}

export default router;