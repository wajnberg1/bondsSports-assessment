export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  team: {
    full_name: string;
  };
  position: string;
    stats: {
    fgm: number;
    fga: number;
    fg_pct: number;
    fg3m: number;
    fg3a: number;
    fg3_pct: number;
    ftm: number;
    fta: number;
    ft_pct: number;
    oreb: number;
    dreb: number;
    reb: number;
    ast: number;
    stl: number;
    blk: number;
    turnover: number;
    pf: number;
    pts: number;
  }
}