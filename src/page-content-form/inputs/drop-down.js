import React from "react";
import useValidation, { ValidationTypes } from "./use-validation";

export default function DropDown({
  label,
  onChange,
  value,
  disabled,
  placeholder,
  data = [], //[{label : name, value : Name}]
  validation = null, //.+/
}) {
  const valid = useValidation({
    data: value,
    type: ValidationTypes.DROPDOWN,
    validation,
  });
  return (
    <div className="flex flex-col gap-1 w-auto flex-1">
      <label className="text-xs">
        {label} {validation && <span className="text-red-700">*</span>}
      </label>
      <select
        value={value}
        onChange={(e) => onChange?.(e)}
        className={`${
          !valid && "border-red-800"
        } p-2 border border-gray-300 rounded-md bg-white`}
        data-validation-label={label}
        data-valid={valid}
      >
        {data.map(({ label, value }) => {
          return (
            <option key={label} value={value}>
              {label}
            </option>
          );
        })}
      </select>
      {!valid && (
        <p className="text-xs text-red-700">{`${label} is required`}</p>
      )}
    </div>
  );
}
