import { types } from "mobx-state-tree";

// TODO
export const Spotify = types
  .model({
    clientId: types.optional(types.string, ""),
    token: types.maybeNull(types.string),
    refreshToken: types.maybeNull(types.string),
  })
  .actions((self) => ({
    setClientId(value: string) {
      self.clientId = value;
    },
    setToken(value: string | null) {
      self.token = value;
    },
    setRefreshToken(value: string | null) {
      self.refreshToken = value;
    },
  }));
