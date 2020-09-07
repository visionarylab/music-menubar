import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import { useMst } from "../../models";
import clsx from "clsx";
import SpotifyAuth from "./SpotifyAuth";

export default observer(() => {
  const store = useMst();

  const { theme, spotify } = store.player;
  const dark = theme === "dark";

  if (!spotify.token) {
    return (
      <div className="relative h-screen">
        <Header title="Spotify Configuration" dark={dark} />
        <div className={clsx(dark && "bg-dark", "full-minus-header")}>
          <SpotifyAuth />
        </div>
      </div>
    );
  }

  return (
    <div className="relative h-screen">
      <Header title="Spotify" dark={dark} />
      <div className={clsx(dark && "bg-dark", "full-minus-header")}>todo</div>
    </div>
  );
});
