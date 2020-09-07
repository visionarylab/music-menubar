import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
// import axios from "axios";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";
import PlayerControls from "../../components/PlayerControls";
import "youtube";
import { getRandomGif } from "../../utils";
import Loader from "react-loader-spinner";
import clsx from "clsx";
// import "react-loader-spinner/dist/loader/css/react-spinner-loader.css"

// const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";

// hard coding here becuase import 'youtube' wasn't actually loading script
if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
}

const dark = localStorage.getItem("theme")
  ? localStorage.getItem("theme") === "dark"
  : false;

// TODO: store onExit view function to collect where left off in playlist if not finished
// TODO: collect any stored info about where left off and initialize player with that on navigate
// to page
// TODO: hide iframe, load gifs instead

export default observer(() => {
  const store = useMst();
  const { index } = useParams();

  const { lofi, theme } = store.player;
  const dark = theme === "dark";

  const [player, createPlayer] = useState<YT.Player | undefined>();

  const [playing, setPlaying] = useState(false);

  const [current, setCurrent] = useState<
    { title: string; url: string } | undefined
  >();

  const [bg, setBg] = useState<any>();

  const playlist = lofi.playlists[Number(index)];

  function onPlayerReady(e: any) {
    e.target.loadPlaylist({
      list: playlist.playlistId,
      listType: "playlist",
      index: 0,
      startSeconds: 0,
      suggestedQuality: "small",
    });
  }

  function onPlayerStateChange(e: any) {
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
    <div
      className={clsx(dark && "bg-dark", "relative h-screen overflow-hidden")}
    >
      <Header
        back="/lofi"
        title={playlist.name}
        editable
        onEdit={playlist.changeName}
        dark
        clear
      />

      <div id="player" className="hidden" />

      <img className="absolute object-cover w-screen h-screen top-0" src={bg} />

      {!bg && (
        <div className="full-minus-header flex items-center justify-center">
          <Loader type="Bars" color="#00BFFF" height={80} width={80} />
        </div>
      )}

      {player && current && bg && (
        <a className="absolute inset-0 flex items-center justify-center text-center text-white font-semibold text-2xl text-shadow-lg tracking-wider">
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
          onSkip={() => player.nextVideo()}
          onReplay={() => player.previousVideo()}
        />
      )}
    </div>
  );
});
