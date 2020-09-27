import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { checkDeadConnection, refreshToken } from "../../api/spotify";
import { useMst } from "../../models";
import Auth from "./Auth";
import Playlists from "./Playlists";

export default function () {
  const store = useMst();
  const navigate = useNavigate();

  async function checkToken(token: string) {
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

  useEffect(() => {
    const {
      clientId,
      clientSecret,
      token,
      refreshToken,
    } = store.player.spotify;

    if (!clientId || !clientSecret || !token || !refreshToken) {
      navigate("authenticate");
    } else if (token) {
      checkToken(token);
    }
  }, []);

  return (
    <Routes>
      <Route path="/" element={<Playlists />} />
      <Route path="authenticate" element={<Auth />} />
    </Routes>
  );
}
