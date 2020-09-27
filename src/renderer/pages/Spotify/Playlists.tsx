import clsx from "clsx";
import { observer } from "mobx-react-lite";
import React, { useEffect, useState } from "react";
import { getPlaylists } from "../../api/spotify";
import Header from "../../components/Header";
import Playlist from "../../components/Spotify/Playlist";
import { useMst } from "../../models";

export default observer(() => {
  const store = useMst();
  const { spotify } = store.player;
  const { token } = spotify;

  const dark = store.player.theme === "dark";

  const [playlists, setPlaylists] = useState<any>();

  async function initPlaylists(token: string) {
    const playlistRes = await getPlaylists(token);

    if (playlistRes.items) {
      setPlaylists(playlistRes.items);
    }
  }

  useEffect(() => {
    if (!playlists && token) {
      initPlaylists(token);
    }
  }, []);

  return (
    <div className={clsx(dark && "bg-dark", "min-h-screen")}>
      <Header title="Spotify Playlists" dark={dark} back="/" />
      {/* TODO: learn suspense and make this functional */}
      <React.Suspense fallback={<div>........LOADING</div>}>
        {playlists &&
          playlists.map((playlist: any) => {
            return (
              <Playlist name={playlist.name} dark={dark} key={playlist.name} />
            );
          })}

        {!playlists ||
          (playlists.length === 0 && (
            <p className={clsx(dark && "text-white", "text-center")}>
              No playlists could be loaded.
            </p>
          ))}
      </React.Suspense>
    </div>
  );
});
