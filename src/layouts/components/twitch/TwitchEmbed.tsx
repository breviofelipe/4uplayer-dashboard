
import "./TwitchEmbed.css";

export type TwitchEmbedProps = {
    embedId: string;
  };

  function TwitchEmbed ( { embedId }: TwitchEmbedProps ) {
  const domain = 'localhost';
  

    return <div className="video-responsive">
    <iframe
        src={`https://player.twitch.tv/?video=${embedId}&autoplay=false&muted=true&time=0h0m00s&parent=${domain}`}
        height="720"
        width="1280"
        title="title"
        allowFullScreen
         />
  </div>
}

export default TwitchEmbed;