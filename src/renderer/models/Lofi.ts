import { types, destroy } from "mobx-state-tree";

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

export const Favorite = types.model({
  name: types.string,
  link: types.string,
});

export const Lofi = types
  .model({
    googleApiKey: types.optional(types.string, ""),

    playlists: types.optional(types.array(YTPlaylist), []),
    streams: types.optional(types.array(YTStream), []),

    favorites: types.optional(types.array(Favorite), []),
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
    createStream(name: string, id: string) {
      self.streams.push(
        YTStream.create({
          name,
          videoId: id,
        })
      );
    },
    deletePlaylist(playlist: any) {
      destroy(playlist);
    },
    deleteStream(stream: any) {
      destroy(stream);
    },
    addFavorite(name: string, link: string) {
      self.favorites.push(
        Favorite.create({
          name,
          link,
        })
      );
    },
    deleteFavorite(favorite: any) {
      destroy(favorite);
    },
  }));
