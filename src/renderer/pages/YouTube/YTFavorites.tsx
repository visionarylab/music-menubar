import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import clsx from "clsx";
import { useMst } from "../../models";

export default observer(() => {
  const store = useMst();

  const dark = store.player.theme === "dark";

  const { favorites } = store.player.youtube;

  return (
    <div className="relative h-screen">
      <Header title="Favorites" dark={dark} action />
      <div
        className={clsx(dark && "bg-dark", "full-minus-header overflow-scroll")}
      >
        {JSON.stringify(favorites)}
      </div>
    </div>
  );
});
