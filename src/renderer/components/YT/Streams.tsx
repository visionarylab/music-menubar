import clsx from "clsx";
import { observer } from "mobx-react-lite";
import { Instance } from "mobx-state-tree";
import React from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
} from "react-beautiful-dnd";
import { useNavigate } from "react-router-dom";
import { useMst } from "../../models";
import { YTStream } from "../../models/YouTube";
import CreateStreamModal from "./CreateStreamModal";
import useToggle from "../utils/useToggle";
import ListHeader from "./ListHeader";

type ListItem = {
  to: string;
  name: string;
  onDelete(): void;
  toEdit: string;
  dark: boolean;
};

export function Stream({ to, name, onDelete, toEdit, dark }: ListItem) {
  const navigate = useNavigate();
  const [hovering, { on, off }] = useToggle(false);

  return (
    <li
      onMouseEnter={on}
      onMouseLeave={off}
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
      </div>
      <div className="flex items-center">
        {hovering && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete();
            }}
            className="text-red-500 hover:text-red-700 mr-4"
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
                d="M15 12H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </button>
        )}

        {hovering && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigate(toEdit);
            }}
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
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        )}
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

type DroppableProps = {
  streams: Instance<typeof YTStream>[];
  onDelete(stream: Instance<typeof YTStream>): void;
  dark: boolean;
};

const DroppableList = observer(
  ({
    provided,
    streams,
    onDelete,
    dark,
  }: { provided: DroppableProvided } & DroppableProps) => (
    <div className="divide-y overflow-y-scroll">
      <ul
        {...provided.droppableProps}
        ref={provided.innerRef}
        className={clsx(
          dark ? "divide-gray-800" : "divide-gray-200",
          "divide-y"
        )}
      >
        {streams.map((stream, index) => (
          <React.Fragment key={index}>
            <Draggable draggableId={String(index)} index={index}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.draggableProps}
                  {...provided.dragHandleProps}
                >
                  <Stream
                    to={`stream/play/${index}`}
                    toEdit={`stream/settings/${index}`}
                    key={index}
                    name={stream.name}
                    onDelete={() => onDelete(stream)}
                    dark={dark}
                  />
                </div>
              )}
            </Draggable>
          </React.Fragment>
        ))}
        {provided.placeholder}
      </ul>
    </div>
  )
);

export default observer(() => {
  const store = useMst();

  const { youtube } = store.player;
  const dark = store.player.theme === "dark";

  const [open, { toggle, off }] = useToggle(false);

  return (
    <React.Fragment>
      {store.player.youtube.streams.length > 0 ? (
        <React.Fragment>
          <CreateStreamModal open={open} onClose={off} />
          <ListHeader title="Streams" toggleCreate={toggle} />
          <DragDropContext
            onDragEnd={(result) => {
              if (result.destination) {
                youtube.reorderStreams(
                  result.source.index,
                  result.destination.index
                );
              }
            }}
          >
            <Droppable droppableId="actions">
              {(provided) => (
                <DroppableList
                  provided={provided}
                  streams={store.player.youtube.streams}
                  onDelete={youtube.deleteStream}
                  dark={dark}
                />
              )}
            </Droppable>
          </DragDropContext>
        </React.Fragment>
      ) : (
        <div className="flex justify-center items-center h-64">
          <h3>Add a stream / video to get started!</h3>
        </div>
      )}
    </React.Fragment>
  );
});
