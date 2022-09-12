import { useEffect, useState } from "react";

export default function useValidation({ type, data, validation }) {
  const [valid, setValid] = useState(true);
  useEffect(() => {
    if (!validation) return;
    if (type === ValidationTypes.INPUT_TEXT) {
      return setValid(
        new RegExp(validation.pattern || /.+/).test((data || "").trim())
      );
    }
    if ([ValidationTypes.DROPDOWN, ValidationTypes.RADIO].includes(type)) {
      return setValid((data || "").trim().length > 0);
    }
    if([ValidationTypes.CHECKBOX].includes(type)){
      return setValid(!!data)
    }
  }, [data]);
  return valid;
}
export class ValidationTypes {
  static INPUT_TEXT = "INPUT_TEXT";
  static DROPDOWN = "DROPDOWN";
  static RADIO = "RADIO";
  static CHECKBOX = "CHECKBOX";
}
