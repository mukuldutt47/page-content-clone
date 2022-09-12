import React, { useEffect, useState } from "react";
import useValidation, { ValidationTypes } from "./use-validation";

export default function TextInput({
  label,
  onChange,
  value,
  disabled,
  placeholder,
  validation = null, //.+/
}) {
  const valid = useValidation({
    data: value,
    type: ValidationTypes.INPUT_TEXT,
    validation,
  });
  return (
    <div className="flex-1 flex flex-col gap-1 w-auto">
      <label className="text-xs">
        {label} {validation && <span className="text-red-700">*</span>}
      </label>
      <input
        className={`p-1 border outline-none p-10px border-opacity-80 border-gray-300 rounded-md px-2 ${
          !valid && "border-red-800"
        }`}
        type="text"
        placeholder={placeholder || label}
        disabled={!!disabled}
        onChange={(e) => onChange?.(e)}
        value={value}
        data-validation-label={label}
        data-valid={valid}
      />
      {!valid && (
        <p className="text-xs text-red-700">{`${label} is required`}</p>
      )}
    </div>
  );
}
