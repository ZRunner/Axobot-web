import { CircularProgress, Stack, Typography } from "@mui/material";
import { Fragment } from "react/jsx-runtime";
import { Helmet } from "react-helmet-async";

import PageTitle from "../components/common/PageTitle";
import GuildBox from "../components/Dashboard/GuildBox";
import { useGetOrFetchAdminGuilds } from "../repository/commands/useGetOrFetchAdminGuilds";


const MetaTags = () => (
  <Helmet>
    <title>Axobot: Server Dashboard</title>
  </Helmet>
);

function GuildsGrid() {
  const { guilds, error, loading } = useGetOrFetchAdminGuilds();

  if (loading || guilds === undefined) {
    return <CircularProgress color="primary" aria-label="Loading guilds" />;
  }

  if (error) {
    console.error(error);
    return (
      <Fragment>
        <Typography my={1}>
          Oops, something went wrong!
        </Typography>
        <Typography variant="subtitle1" color="text.secondary" fontStyle="italic">
          Sorry, an unexpected error has occurred.
        </Typography>
      </Fragment>
    );
  }

  return (
    <Stack direction="row" flexWrap="wrap" gap={3} my={4} justifyContent="center">
      {Object.entries(guilds).map(([guildId, guild]) => (
        <GuildBox guild={guild} key={guildId} />
      ))}
    </Stack>
  );

}


export default function GuildSelection() {

  return (
    <Fragment>
      <MetaTags />
      <PageTitle text="Select your server" />
      <GuildsGrid />
    </Fragment>
  );
}

export const Component = GuildSelection;