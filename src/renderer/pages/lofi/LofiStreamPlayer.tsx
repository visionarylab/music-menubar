import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import PlayerControls from "../../components/PlayerControls";
import { getRandomGif } from "../../utils";
import "youtube";

// const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";

// hard coding here becuase import 'youtube' wasn't actually loading script
if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
}

export default observer(() => {
  const store = useMst();
  const { lofi } = store.player;
  const { index } = useParams();

  const stream = lofi.streams[Number(index)];

  const [player, createPlayer] = useState<YT.Player | undefined>();

  const [playing, setPlaying] = useState(false);

  const [current, setCurrent] = useState<
    { title: string; url: string } | undefined
  >();

  const [bg, setBg] = useState(require(getRandomGif().gif));

  function onPlayerReady(e: any) {
    // e.target.loadVideo({
    //   list: playlist.playlistId,
    //   listType: "playlist",
    //   index: 0,
    //   startSeconds: 0,
    //   suggestedQuality: "small",
    // });
  }

  function onPlayerStateChange(e: any) {
    // console.log(e.target.playerInfo);

    const { videoUrl } = e.target.playerInfo;
    const { title } = e.target.playerInfo.videoData;

    const currentlyPlaying = e.target.getPlayerState() === 1;

    if (currentlyPlaying !== playing) {
      if (!playing && currentlyPlaying) {
        setBg(getRandomGif().gif);
      }
      setPlaying(currentlyPlaying);
    }

    if (!current || current.title !== title || current.url !== videoUrl) {
      setCurrent({ title, url: videoUrl });
    }
  }

  useEffect(() => {
    if (!player) {
      createPlayer(
        // @ts-ignore
        new YT.Player("player", {
          height: "300",
          width: "300",
          videoId: stream.videoId,
          playerVars: {
            controls: "0",
            autoplay: "1",
          },
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
          },
        })
      );

      setPlaying(true);
    }
  });

  return (
    <div className="relative h-screen overflow-hidden">
      <Header
        back="/lofi"
        title={stream.name}
        editable
        onEdit={stream.changeName}
        dark
        clear
      />

      <div id="player" className="hidden" />

      <img
        className="absolute top-12 object-cover w-screen h-screen"
        src={bg}
      />

      {player && current && (
        <a className="px-2 text-center absolute inset-0 flex items-center justify-center text-white font-semibold text-2xl text-shadow-lg tracking-wider">
          {current.title}
        </a>
      )}

      {player && (
        <PlayerControls
          playing={playing}
          onPlay={() => {
            player.playVideo();
            setPlaying(true);
          }}
          onPause={() => {
            player.pauseVideo();
            setPlaying(false);
          }}
        />
      )}
    </div>
  );
});
