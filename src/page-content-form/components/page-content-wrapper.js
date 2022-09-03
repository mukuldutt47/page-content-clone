import React from "react";

export default function PageContentWrapper({ label, children, width = 'w-3/5' }) {
  return (
    <div
    style={{
      maxHeight : '80vh'
    }}
      className={`page-content-wrapper flex flex-col outline outline-1 outline-gray-300 pb-5 rounded-md bg-white ${width}`}
    >
      <div className="p-5 text-white bg-blue-800">{label}</div>
      <div className="m-4 overflow-auto ">{children}</div>
    </div>
  );
}
