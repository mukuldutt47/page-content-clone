import React from "react";

export default function DataGrid({ children, onAdd, onRemove, optional }) {
  children = Array.isArray(children) ? children : [children];
  return (
    <div className="flex flex-col gap-4 m-2 justify-start data-grid p-4 border border-gray-300 rounded-md">
      <div className="flex flex-col gap-4">
        {children.map((child, index) => {
          return (
            <div className="flex flex-col relative">
              <div className="text-right">
                <button
                  className=" bg-blue-800 text-white rounded-md p-2 px-4 text-sm border-none"
                  onClick={() => {
                    if (children?.length > 1 || optional) {
                      onRemove?.(index);
                    }
                  }}
                >
                  X
                </button>
              </div>
              {child}
            </div>
          );
        })}
      </div>
      <button
        onClick={() => onAdd?.()}
        className="w-40 bg-blue-800 text-white rounded-md py-2 cursor-pointer border-none"
      >
        Add Another
      </button>
    </div>
  );
}
