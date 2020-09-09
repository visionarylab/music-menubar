import React from "react";
import clsx from "clsx";

type Controls = {
  playing: any | undefined;
  onPlay(): void;
  onPause(): void;
  onSkip?(): void;
  onReplay?(): void;

  // noncontrols props
  dark: boolean;
};

export default function SpotifyControls({
  playing,
  onPlay,
  onPause,
  onSkip,
  onReplay,
  dark,
}: Controls) {
  function toggle() {
    if (playing) {
      onPause();
    } else {
      onPlay();
    }
  }

  return (
    <div>
      <div
        className={clsx(
          dark ? "bg-darker" : "bg-white",
          "absolute inset-x-0 bottom-0"
        )}
      >
        <div
          className={clsx(
            dark ? "text-white text-shadow-lg" : "text-gray-800",
            "relative flex justify-center items-center h-24"
          )}
        >
          {playing && (
            <div className="absolute inset-x-0 left-2">
              <img src={playing.albumArt} className="w-16 object-scale-down" />
            </div>
          )}

          <div className="text-center">
            <button onClick={toggle}>
              {playing ? (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="pause w-12 h-12 hoverable"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="play w-12 h-12 hoverable"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
