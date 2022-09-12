import React from "react";

export default function Checkbox({ label, value, onClick }) {
  return (
    <div className="flex flex-wrap gap-2">
      <input
      className="outline-none p-10px"
        type="checkbox"
        checked={value}
        onClick={(e) => onClick?.(e)}
      ></input>
      <label className="text-sm">{label}</label>
    </div>
  );
}
