import React from "react";
import useToggle from "../utils/useToggle";
import { motion, AnimatePresence } from "framer-motion";
import OutsideClickHandler from "react-outside-click-handler";

// TODO: add key escape

type ItemProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  label: string;
  onClick(): void;
};

export function SelectItem({ label, onClick, ...props }: ItemProps) {
  return (
    <button
      onClick={onClick}
      className="w-full block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900 text-left"
      {...props}
    >
      {label}
    </button>
  );
}

type SelectProps = {
  label?: string;
  items?: any[];
  children?: React.ReactNode;
};

export default function Select({ label, children }: SelectProps) {
  const [open, { off, toggle }] = useToggle(false);

  return (
    <OutsideClickHandler onOutsideClick={off}>
      <div className="relative inline-block text-left">
        <div onClick={() => toggle()}>
          <span className="rounded-md shadow-sm">
            <button
              type="button"
              className="inline-flex justify-center w-full rounded-md border border-gray-300 px-4 py-2 bg-white text-sm leading-5 font-medium text-gray-700 hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800 transition ease-in-out duration-150"
            >
              {label}
              <svg
                className="-mr-1 ml-2 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </span>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.1 }}
              className="duration-100 origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg"
            >
              <div className="rounded-md bg-white shadow-xs">
                <div className="py-1">{children}</div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </OutsideClickHandler>
  );
}
