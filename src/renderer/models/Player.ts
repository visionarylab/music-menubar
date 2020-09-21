import { types } from "mobx-state-tree";
import { YouTube } from "./YouTube";
import { Spotify } from "./Spotify";

export const Player = types
  .model({
    token: types.maybeNull(types.string),
    theme: types.optional(types.string, "light"),

    // is this bad practice?
    spotify: types.optional(Spotify, () => Spotify.create({})),
    youtube: types.optional(YouTube, () => YouTube.create({})),
  })
  .actions((self) => ({
    setToken(value: string | null) {
      self.token = value;
    },
    setTheme(value: string) {
      self.theme = value;
    },
  }));
