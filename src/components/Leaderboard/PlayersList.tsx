import { CircularProgress, List, ListItem } from "@mui/material";
import useInfiniteScroll from "react-infinite-scroll-hook";

import { RankedPlayer } from "../../repository/types/users";
import PlayerRow from "./PlayerRow";

interface PlayersListProps {
  players: RankedPlayer[];
  loading: boolean;
  loadMore: () => void;
}

export default function PlayersList({ players, loading, loadMore }: PlayersListProps) {
  const hasNextPage = true;

  const [sentryRef] = useInfiniteScroll({
    loading,
    hasNextPage,
    onLoadMore: loadMore,
    delayInMs: 500,
  });

  return (
    <List sx={{
      minWidth: {
        xs: "95%",
        sm: "min(80%, 40rem)",
      },
    }}>
      {players.map(player => <PlayerRow key={player.user_id} player={player} />)}

      {(loading || hasNextPage) && (
        <ListItem ref={sentryRef} sx={{ justifyContent: "center" }}>
          <CircularProgress color="primary" />
        </ListItem>
      )}
    </List>
  );
}

