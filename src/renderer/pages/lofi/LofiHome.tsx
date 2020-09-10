import React from "react";
import { observer } from "mobx-react-lite";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useMst } from "../../models";
// import Select, { SelectItem } from "../../components/ui/Select";
import useToggle from "../../components/utils/useToggle";
import CreatePlaylistModal from "../../components/CreatePlaylistModal";
import clsx from "clsx";
import CreateStreamModal from "../../components/CreateStreamModal";
// import CreatePlaylistModal from "../../components/CreatePlaylistModal";

function LofiItem({
  to,
  name,
  onDelete,
  dark,
}: {
  to: string;
  name: string;
  onDelete(): void;
  dark: boolean;
}) {
  const navigate = useNavigate();

  return (
    <li
      onClick={() => {
        navigate(to);
      }}
      className={clsx(
        dark ? "bg-dark hover:bg-gray-500" : "hover:bg-gray-100 ",
        "p-6 flex transition-colors duration-150 cursor-pointer"
      )}
    >
      <div className="flex-1">
        <div
          className={clsx(dark ? "text-white" : "text-gray-900", "font-bold")}
        >
          {name}
        </div>
        {/* <div className="text-gray-600">{description}</div> */}
      </div>
      <div className="flex items-center">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          className="text-red-500 hover:text-red-700"
        >
          <svg
            viewBox="0 0 20 20"
            fill="currentColor"
            className="trash w-6 h-6"
          >
            <path
              fillRule="evenodd"
              d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
        <svg
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={clsx(dark && "text-white", "w-6 ml-6")}
        >
          <path d="M9 5l7 7-7 7"></path>
        </svg>
      </div>
    </li>
  );
}

// TODO: make dropdown selection for creating either stream or playlist viewer
export default observer(() => {
  const store = useMst();

  const navigate = useNavigate();

  const [playlistModal, playlistModalActions] = useToggle(false);
  const [streamModal, streamModalActions] = useToggle(false);

  const { lofi, theme } = store.player;

  const dark = theme === "dark";

  const { playlists, streams } = lofi;

  return (
    <div className={clsx(dark && "bg-dark", "min-h-screen")}>
      <Header
        title="Lofi"
        dark={dark}
        action={
          <button
            onClick={() => navigate("/lofi/favorites")}
            className="text-white hover:bg-gray-700 rounded-full p-2 focus:outline-none transition-colors duration-150"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
              />
            </svg>
          </button>
        }
      />
      <div className="px-6 py-2 flex justify-between items-center">
        <h3
          className={clsx(
            dark ? "text-white" : "text-gray-900",
            "text-xl font-bold "
          )}
        >
          Playlists
        </h3>

        <button
          onClick={playlistModalActions.toggle}
          className={clsx(
            dark
              ? "border-white-600 hover:bg-white text-white  hover:text-black"
              : "border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600  hover:text-white",
            "flex justify-between space-x-2 rounded-full border-2 transition-colors focus:outline-none duration-300 text-lg px-2 py-1 items-center font-semibold"
          )}
        >
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 font-bold"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>

          <p className="text-sm">Create</p>
        </button>
      </div>

      <CreatePlaylistModal
        open={playlistModal}
        onClose={playlistModalActions.off}
      />

      <CreateStreamModal open={streamModal} onClose={streamModalActions.off} />

      <div className="divide-y overflow-y-scroll">
        <ul
          className={clsx(
            dark ? "divide-gray-800" : "divide-gray-200",
            "divide-y "
          )}
        >
          {playlists &&
            playlists.length > 0 &&
            playlists.map((playlist, index) => {
              return (
                <LofiItem
                  key={playlist.playlistId}
                  to={`/lofi/playlist/${index}`}
                  name={playlist.name}
                  onDelete={() => lofi.deletePlaylist(playlist)}
                  dark={dark}
                />
              );
            })}
        </ul>
      </div>

      <div className="pt-8 px-6 py-2 flex justify-between items-center">
        <h3
          className={clsx(
            dark ? "text-white" : "text-gray-900",
            "text-xl font-bold "
          )}
        >
          Streams
        </h3>

        <button
          onClick={streamModalActions.toggle}
          className={clsx(
            dark
              ? "border-white-600 hover:bg-white text-white  hover:text-black"
              : "border-indigo-600 bg-white hover:bg-indigo-600 text-indigo-600  hover:text-white",
            "flex justify-between space-x-2 rounded-full border-2 transition-colors focus:outline-none duration-300 text-lg px-2 py-1 items-center font-semibold"
          )}
        >
          <svg
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="h-4 w-4 font-bold"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>

          <p className="text-sm">Create</p>
        </button>
      </div>

      <div className="divide-y overflow-y-scroll">
        <ul className="divide-y divide-gray-200">
          {streams &&
            streams.length > 0 &&
            streams.map((stream, index) => {
              return (
                <LofiItem
                  key={stream.videoId}
                  to={`/lofi/stream/${index}`}
                  name={stream.name}
                  onDelete={() => lofi.deleteStream(stream)}
                  dark={dark}
                />
              );
            })}
        </ul>
      </div>
    </div>
  );
});
