import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { Checkbox, DropDown, Radio, TextInput } from "../inputs";

export default function FormType({
  pageContentData,
}) {
  const context = useContext(FormContext);
  const update = (type, targetValue) => {
    return (e) => {
      context.updateObject(
        type,
        pageContentData,
        e.target[targetValue],
        context.data
      );
    };
  };
  useEffect(() => {
    if (typeof pageContentData["formSource"] === "undefined") {
      update("formSource", "value")({ target: { value: "existingForm" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"Form Config"}>
      <div className="flex gap-4 flex-col">
        <div>Form Source</div>
        <Radio
          name={"form_source"}
          data={[
            { label: "Existing Form", value: "existingForm" },
            { label: "url", value: "url" },
          ]}
          value={pageContentData["formSource"]}
          onClick={update("formSource", "value")}
        />
        <Checkbox
          label={"Read Only"}
          value={pageContentData["readOnly"]}
          onClick={update("readOnly", "checked")}
        />
        <div className="flex gap-2 flex-1 flex-wrap">
          {pageContentData["formSource"] !== "url" ? (
            <DropDown
              label={"Form"}
              data={[{ uuid: "", name: "" }, ...context.forms]?.map((form) => {
                return { value: form.uuid, label: form.name };
              })}
              value={pageContentData["form_id"]}
              onChange={update("form_id", "value")}
            />
          ) : (
            <TextInput
              label={"URL"}
              value={pageContentData["url"]}
              onChange={update("url", "value")}
            />
          )}
          <TextInput label={"File Id"} disabled={true} value={"{{uuid}}"} />
        </div>
      </div>
    </PageContentWrapper>
  );
}
