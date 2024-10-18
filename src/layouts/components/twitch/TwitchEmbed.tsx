
import { Box } from "@mui/material";
import "./TwitchEmbed.css";

export type TwitchEmbedProps = {
    embedId: string;
  };

  function TwitchEmbed ( { embedId }: TwitchEmbedProps ) {
  const domain = 'localhost';
  
    const renderTwitch = (
      <Box
          component="iframe"
          title="title"
          allowFullScreen
          src={`https://player.twitch.tv/?video=${embedId}&autoplay=false&muted=true&time=0h0m00s&parent=${domain}`}
          sx={{
            top: 0,
            width: 1,
            height: 1,
            objectFit: 'cover',
            position: 'absolute',
          }}
        />
    );

    return renderTwitch;
}

export default TwitchEmbed;