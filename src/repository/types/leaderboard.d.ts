export interface LeaderboardData {
  guild: LeaderboardResponse["guild"]
  players: {[key: string]: RankedPlayer}
  totalCount: number,
  xpType: string,
  xpRate: number,
}

export interface RankedPlayer {
  ranking: number;
  user_id: string;
  xp: number;
  level: number;
  xp_to_current_level: number;
  xp_to_next_level: number;
  username: string | null;
  avatar: string;
}