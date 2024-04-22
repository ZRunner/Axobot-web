import ReactDOMServer from "react-dom/server";

export function render(url: string) {
  console.log("url is", url);
  return {
    head: ReactDOMServer.renderToString(getMetaTagsFromURL(url)),
    html: "",
  };
}

function getMetaTagsFromURL(url: string) {
  switch (url) {
  case "leaderboard/global":
    return <title>Axobot: Global Leaderboard</title>;
  case url.match(/^leaderboard\/\d{17,20}$/)?.[0]:
    return <title>Axobot: Server Leaderboard</title>;
  case "dashboard":
    return <title>Axobot: Your Dashboard</title>;
  case url.match(/^dashboard\/\d{17,20}$/)?.[0]:
    return <title>Axobot: Server Dashboard</title>;
  default:
    return <title>Axobot</title>;
  }
}