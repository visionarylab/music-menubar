import React, { useEffect, useState } from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import { useMst } from "../../models";
import clsx from "clsx";
import SpotifyAuth from "./SpotifyAuth";
import {
  checkDeadConnection,
  getPlaylists,
  refreshToken,
} from "../../api/spotify";
import Playlists from "../../components/spotify/Playlists";
import SpotifyControls from "../../components/spotify/SpotifyControls";
import Songs from "../../components/spotify/Songs";

export default observer(() => {
  const store = useMst();

  const [playlists, setPlaylists] = useState<any>();
  const [playlist, setPlaylist] = useState<any>();

  const [playing, setPlaying] = useState<any>();

  // async function test() {
  //   const { token } = store.player.spotify;
  //   if (token) {
  //     // console.log(await getDevices(token));
  //   }
  // }

  // TODO: this is SO MESSY, clean up
  useEffect(() => {
    async function initPlaylists(token: string) {
      const playlistRes = await getPlaylists(token);

      // console.log(playlistRes);

      if (playlistRes.items) {
        setPlaylists(playlistRes.items);
      }
    }

    async function testToken(token: string) {
      const ping = await checkDeadConnection(token);

      if (ping.error) {
        const newToken = await refreshToken(
          btoa(
            `${store.player.spotify.clientId}:${store.player.spotify.clientSecret}`
          ),
          // assumption: cannot have refresh token w/out token and
          // cannot get to this function without token
          store.player.spotify.refreshToken!
        );

        const { access_token } = newToken.data;

        if (access_token) {
          store.player.spotify.setToken(access_token);
        }
      }
    }

    const { token } = store.player.spotify;
    if (token) {
      testToken(token);
    }

    if (token && !playlists) {
      initPlaylists(token);
    }
  });

  const { theme, spotify } = store.player;
  const dark = theme === "dark";

  console.log(playlist);

  if (!spotify.token) {
    return (
      <div className="relative h-screen">
        <Header title="Spotify Configuration" dark={dark} back="/" />
        <div className={clsx(dark && "bg-dark", "full-minus-header")}>
          <SpotifyAuth />
        </div>
      </div>
    );
  }

  // FIXME: MAYBE - Discussion:
  /*
   * In order to keep spotify continually streaming while playing, I didn't want to separate this component
   * into separate routes, as that would interrupt the audio while rerouting to another page. Instead, I try and
   * conditionally render components. Is this bad? Is there a better solution here?
   */
  return (
    <div className="relative h-screen">
      <Header title="Spotify" dark={dark} />
      <div
        className={clsx(
          dark && "bg-dark",
          playing ? "spotify-body" : "full-minus-header",
          "overflow-scroll"
        )}
      >
        {/* <button onClick={() => store.player.spotify.setToken(null)}>
          clear token
        </button> */}

        {/* <button onClick={test}>test get devices</button> */}

        {playlists && !playlist && (
          <Playlists
            playlists={playlists}
            dark={dark}
            setPlaylist={setPlaylist}
          />
        )}

        {playlist && (
          <Songs songs={playlist} onSongSelect={setPlaying} playing={playing} />
        )}

        {playing && <SpotifyControls dark={dark} playing={playing} />}
      </div>
    </div>
  );
});
