import React from "react";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router-dom";
import { useMst } from "../../models";

export default observer(() => {
  const store = useMst();
  const { lofi } = store.player;
  const { index } = useParams();

  return <div></div>;
});
