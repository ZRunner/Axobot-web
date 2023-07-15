import { useEffect } from "react";

import { useFetchLeaderboard } from "../api/useFetchLeaderboard";
import { useAppDispatch } from "../redux/hooks";
import useLeaderboardSelector from "../redux/selectors/useLeaderboardSelector";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { PLAYERS_PER_PAGE, setLeaderboard } from "../redux/slices/leaderboardSlice";

export function useGetLeaderboard(guildId: "global" | string, page: number) {
  const { fetchLeaderboardCommand, data, error, loading } = useFetchLeaderboard(guildId, page, PLAYERS_PER_PAGE);
  const token = useTokenSelector();
  const leaderboard = useLeaderboardSelector(guildId, page);
  const dispatch = useAppDispatch();

  if (leaderboard === null && data === null && token !== null && !loading && !error) {
    fetchLeaderboardCommand();
  }

  useEffect(() => {
    if (data !== null && error === null && !loading) {
      dispatch(setLeaderboard({ guildId, page, data: data }));
      console.log("dispatched leaderboard");
    } else {
      console.log(`data=${data}, error=${error}, loading=${loading}`);
    }
  }, [data, dispatch, error, guildId, loading, page]);

  return { leaderboard, error, loading };
}