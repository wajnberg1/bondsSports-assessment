export const API_KEY = "5d23bc2a-b02e-4556-b412-5a2e21090646";

export interface Player {
  id: number;
  first_name: string;
  last_name: string;
  team: {
    full_name: string;
  };
  position: string;
}

export interface Stat {
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
};

export const statFields = ["fgm", "fga", "fg_pct", "fg3m", "fg3a", "fg3_pct", "ftm", "fta", "ft_pct", "oreb", "dreb", "reb", "ast", "stl", "blk", "turnover", "pf", "pts"];