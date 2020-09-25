import clsx from "clsx";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Header from "../../components/Header";
import { useMst } from "../../models";

function Home() {
  const store = useMst();

  const dark = store.player.theme === "dark";

  return (
    <div className={clsx(dark && "bg-dark", "min-h-screen")}>
      <Header title="Spotify" dark={dark} />
      TODO
    </div>
  );
}

export default function () {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
}
