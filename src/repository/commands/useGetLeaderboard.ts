import { useEffect } from "react";

import { useFetchLeaderboard } from "../api/useFetchLeaderboard";
import { useAppDispatch } from "../redux/hooks";
import useLeaderboardSelector from "../redux/selectors/useLeaderboardSelector";
import useTokenSelector from "../redux/selectors/useTokenSelector";
import { PLAYERS_PER_PAGE, setLeaderboard } from "../redux/slices/leaderboardSlice";

export function useGetLeaderboard(guildId: "global" | string) {
  const { fetchLeaderboardCommand, data, error, loading } = useFetchLeaderboard(guildId);
  const token = useTokenSelector();
  const leaderboard = useLeaderboardSelector(guildId, 0);
  const dispatch = useAppDispatch();

  const isTokenValid = guildId === "global" || token !== null;

  useEffect(() => {
    if (data !== null && error === null && !loading) {
      const page = Math.floor(data[0].ranking / PLAYERS_PER_PAGE);
      dispatch(setLeaderboard({ guildId, page: page, data: data }));
      console.debug("Dispatched leaderboard for page " + page);
    }
  }, [data, dispatch, error, guildId, loading]);

  function fetchLeaderboardPage(page: number) {
    if (isTokenValid) {
      fetchLeaderboardCommand(page, PLAYERS_PER_PAGE);
    }
  }

  return { fetchLeaderboardPage, leaderboard, error, loading };
}