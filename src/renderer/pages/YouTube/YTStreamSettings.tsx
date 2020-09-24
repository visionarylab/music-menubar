import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import { useMst } from "../../models";
import { useParams } from "react-router-dom";
// import { useMst } from "../../models";

export default observer(() => {
  const store = useMst();
  const index = useParams().index;

  const dark = store.player.theme === "dark";

  const stream = store.player.youtube.streams[parseInt(index, 10)];

  return (
    <div>
      <Header back="/youtube" title={`${stream.name} Settings`} dark={dark} />
      TODO
    </div>
  );
});
