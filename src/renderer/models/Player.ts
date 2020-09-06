import { types, destroy } from "mobx-state-tree";

function createDefaultSpotify() {
  return Spotify.create({});
}

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

export const YTPlaylist = types
  .model({
    name: types.optional(types.string, "New Playlist"),
    playlistId: types.string,
  })
  .actions((self) => ({
    changeName(value: string) {
      self.name = value;
    },
    setPlaylistId(value: string) {
      self.playlistId = value;
    },
  }));

export const YTStream = types
  .model({
    name: types.optional(types.string, "New Stream"),
    videoId: types.string,
  })
  .actions((self) => ({
    changeName(value: string) {
      self.name = value;
    },
  }));

export const Lofi = types
  .model({
    googleApiKey: types.optional(types.string, ""),

    playlists: types.optional(types.array(YTPlaylist), []),
    streams: types.optional(types.array(YTStream), []),

    // not sure if needed
    // youtubeToken: types.optional(types.string, ""),
  })
  .actions((self) => ({
    setApiKey(value: string) {
      self.googleApiKey = value;
    },
    createPlaylist(name: string, id: string) {
      self.playlists.push(
        YTPlaylist.create({
          name,
          playlistId: id,
        })
      );
    },
    deletePlaylist(playlist: any) {
      destroy(playlist);
    },
  }));

// TODO: fix me
export const Player = types
  .model({
    token: types.maybeNull(types.string),

    // is this bad practice?
    spotify: types.optional(Spotify, createDefaultSpotify),
    lofi: types.optional(Lofi, () => Lofi.create({})),
  })
  .actions((self) => ({
    setToken(value: string | null) {
      self.token = value;
    },
  }));
