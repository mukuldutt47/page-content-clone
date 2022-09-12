import React from "react";
import useValidation, { ValidationTypes } from "./use-validation";

export default function Radio({ name, data, onClick, value, validation }) {
  const valid = useValidation({
    data: value,
    type: ValidationTypes.RADIO,
    validation,
  });
  return (
    <div
      className="flex flex-wrap gap-4"
      data-validation-label={name}
      data-valid={valid}
    >
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
            <label className={!valid && "text-red-800"}>
              {radioData.label}
            </label>
          </div>
        );
      })}

      {!valid && (
        <p className="text-xs text-red-700">{`${name} is required`}</p>
      )}
    </div>
  );
}
