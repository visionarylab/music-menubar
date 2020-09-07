import React, { useState } from "react";
import Modal, { ModalContent, ModalFooter } from "./ui/Modal";
import { observer } from "mobx-react-lite";
import { useMst } from "../models";

type ModalProps = {
  open: boolean;
  onClose(): void;
};

export default observer(({ open, onClose }: ModalProps) => {
  const store = useMst();
  const [name, setName] = useState("");
  const [id, setId] = useState("");

  function onSubmit() {
    store.player.lofi.createStream(name, id);
    onClose();
  }

  return (
    <Modal open={open} onClose={onClose}>
      <ModalContent
        title={
          <h3 className="cormorant text-2xl leading-6 font-medium text-gray-900">
            Create Stream
          </h3>
        }
      >
        <div className="flex flex-col space-y-5 pt-2">
          <div>
            <p className="text-sm text-gray-600">
              This is intended for lofi YouTube streams, however it can be used
              for any individual video so long as you have the id
            </p>
          </div>
          <div>
            <label className="block text-sm leading-5 font-medium text-gray-700">
              Stream Name
            </label>

            <input
              className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
              placeholder="Enter the stream name here"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm leading-5 font-medium text-gray-700">
              Stream ID
            </label>

            <input
              className="form-input w-full mt-1 rounded-md border border-gray-300 px-4 py-2 text-sm leading-5"
              placeholder="Enter the stream (video) ID here"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
        </div>
      </ModalContent>
      <ModalFooter>
        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="ml-2 shadow-sm relative inline-flex items-center px-4 py-2 border text-base leading-6 rounded-md transition ease-in-out duration-150  border-transparent focus:outline-none  bg-gray-300 hover:bg-gray-500 focus:shadow-outline-gray focus:border-gray-500 active:bg-gray-500"
          >
            Close
          </button>
          <button
            onClick={onSubmit}
            className="ml-2 shadow-sm relative inline-flex items-center px-4 py-2 border text-base leading-6 rounded-md transition ease-in-out duration-150  border-transparent text-white focus:outline-none  bg-green-600 hover:bg-green-500 focus:shadow-outline-green focus:border-green-700 active:bg-green-700"
          >
            Create
          </button>
        </div>
      </ModalFooter>
    </Modal>
  );
});
