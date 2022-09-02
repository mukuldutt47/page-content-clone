import React from "react";

export default function Radio({ name, data, onClick, value }) {
  return (
    <div className="flex flex-wrap gap-4">
      {data.map((radioData) => {
        return (
          <div className="flex text-sm gap-2">
            <input
              type="radio"
              name={name}
              value={radioData.value}
              onClick={(e) => onClick?.(e)}
              checked={!!(value === radioData.value)}
            ></input>
            <label>{radioData.label}</label>
          </div>
        );
      })}
    </div>
  );
}
