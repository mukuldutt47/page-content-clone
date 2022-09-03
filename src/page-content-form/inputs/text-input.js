import React from "react";

export default function TextInput({
  label,
  onChange,
  value,
  disabled,
  placeholder,
}) {
  return (
    <div className="flex-1 flex flex-col gap-1 w-auto">
      <label className="text-xs">{label}</label>
      <input
      className="p-1 border focus:outline-none border-opacity-80 border-gray-300 rounded-md px-2"
        type="text"
        placeholder={placeholder || label}
        disabled={!!disabled}
        onChange={(e) => onChange?.(e)}
        value={value}
      />
    </div>
  );
}
