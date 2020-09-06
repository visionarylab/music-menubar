import React, { useEffect } from "react";
import { observer } from "mobx-react-lite";
import { useMst } from "../../models";
import Header from "../../components/Header";
import { useParams } from "react-router-dom";

// const baseURL = "https://www.googleapis.com/youtube/v3/playlistItems";

export default observer(() => {
  const store = useMst();
  const { lofi } = store.player;
  const { index } = useParams();

  const stream = lofi.streams[Number(index)];

  useEffect(() => {});

  return (
    <div>
      <Header title={stream.name} />
    </div>
  );
});
