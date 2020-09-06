import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
import axios from "axios";
import Header from "../../components/Header";
import { useParams, useLocation } from "react-router-dom";
import PlayerControls from "../../components/PlayerControls";

// @ts-ignore ts dumb dumb
import defaultGif from "../../assets/default.gif";

import "youtube";

// const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";

// hard coding here becuase import 'youtube' wasn't actually loading script
if (typeof YT == "undefined" || typeof YT.Player == "undefined") {
  var tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  var firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag?.parentNode?.insertBefore(tag, firstScriptTag);
}

// TODO: store onExit view function to collect where left off in playlist if not finished
// TODO: collect any stored info about where left off and initialize player with that on navigate
// to page
// TODO: hide iframe, load gifs instead

export default observer(() => {
  const store = useMst();
  const { lofi } = store.player;
  const { index } = useParams();
  const [player, createPlayer] = useState<YT.Player | undefined>();
  const [playing, setPlaying] = useState(false);

  const playlist = lofi.playlists[Number(index)];

  // async function get_playlist() {
  //   if (!playlist) return;

  //   const res = await axios.get(baseURL, {
  //     params: {
  //       part: "id",
  //       playlistId: playlist.playlistId,
  //       key: lofi.googleApiKey,
  //     },
  //   });

  //   console.log(res);
  // }

  function onPlayerReady(e: any) {
    e.target.loadPlaylist({
      list: playlist.playlistId,
      listType: "playlist",
      index: 0,
      startSeconds: 0,
      suggestedQuality: "small",
    });
  }

  // function onPlayerStateChange(e: any) {

  // }

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
            // onStateChange: onPlayerStateChange,
          },
        })
      );

      setPlaying(true);
    }
  });

  return (
    <div className="h-screen">
      <Header
        back="/lofi"
        title={playlist.name}
        editable
        onEdit={playlist.changeName}
      />

      {/* <div>
          <label className="block text-sm leading-5 font-medium text-gray-700">
            Playlist ID
          </label>

          <input
            className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
            placeholder="Enter your playlist ID here"
            value={playlist.playlistId}
            onChange={(e) => playlist.setPlaylistId(e.target.value)}
          />
        </div> */}
      <div id="player" className="hidden" />
      <div className="">
        <img className="object-cover w-screen" src={defaultGif} />
      </div>

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
