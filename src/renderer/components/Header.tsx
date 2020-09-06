import React from "react";
import { Link, useLocation } from "react-router-dom";
import clsx from "clsx";

function HeaderItem({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={clsx("flex items-center", className)}>{children}</div>;
}

type Props = {
  back?: string;
  title: string;
  action?: React.ReactNode;
  editable?: boolean;
  onEdit?(e: any): void;
};

export default function Header({
  back,
  title,
  action,
  editable,
  onEdit,
}: Props) {
  const location = useLocation();

  console.log(back);

  return (
    <div className="px-4 app-header overflow-hidden grid grid-cols-6 border-b sticky top-0 z-20 bg-white">
      <HeaderItem className="justify-start col-span-1">
        {location.pathname === "/" ? (
          <button
            className="rounded-full p-2 outline-none text-gray-200"
            disabled
          >
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </button>
        ) : (
          <Link
            to={back ? back : ".."}
            className="rounded-full p-2 hover:bg-gray-200 focus:outline-none transition-colors duration-150"
          >
            <svg
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path d="M15 19l-7-7 7-7"></path>
            </svg>
          </Link>
        )}
      </HeaderItem>
      <HeaderItem className="justify-center col-span-4">
        {editable && onEdit ? (
          <input
            className="outline-none text-center text-2xl font-bold text-gray-900 flex-1"
            value={title}
            onChange={(e: any) => onEdit(e.target.value)}
            title="Edit Name"
          />
        ) : (
          <h1 className="text-center text-2xl font-bold text-gray-900 flex-1">
            {title}
          </h1>
        )}
      </HeaderItem>
      <HeaderItem className="justify-end col-span-1">{action}</HeaderItem>
    </div>
  );
}
