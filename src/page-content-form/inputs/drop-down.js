import React from "react";

export default function DropDown({
  label,
  onChange,
  value,
  disabled,
  placeholder,
  data = [], //[{label : name, value : Name}]
}) {
  return (
    <div className="flex flex-col gap-1 w-auto flex-1">
      <label className="text-xs">{label}</label>
      <select value={value} onChange={(e) => onChange?.(e)} className="p-2 border border-gray-300 rounded-md bg-white">
        {data.map(({ label, value }) => {
          return (
            <option key={label} value={value}>
              {label}
            </option>
          );
        })}
      </select>
    </div>
  );
}
