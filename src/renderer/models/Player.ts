import { types } from "mobx-state-tree";
import { Lofi } from "./Lofi";
import { Spotify } from "./Spotify";

// TODO: fix me
export const Player = types
  .model({
    token: types.maybeNull(types.string),
    theme: types.optional(types.string, "light"),

    // is this bad practice?
    spotify: types.optional(Spotify, () => Spotify.create({})),
    lofi: types.optional(Lofi, () => Lofi.create({})),
  })
  .actions((self) => ({
    setToken(value: string | null) {
      self.token = value;
    },
    setTheme(value: string) {
      self.theme = value;
    },
  }));
