import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { Checkbox, DropDown, Radio, TextInput } from "../inputs";

export default function FormType({ pageContentData }) {
  const context = useContext(FormContext);
  const { onDynamicUpdate } = context;
  useEffect(() => {
    if (typeof pageContentData["formSource"] === "undefined") {
      onDynamicUpdate(
        ["formSource"],
        null,
        pageContentData
      )({ target: { value: "existingForm" } });
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
          onClick={onDynamicUpdate(["formSource"], null, pageContentData)}
        />
        <Checkbox
        validation={{}}
          label={"Read Only"}
          value={pageContentData["readOnly"]}
          onClick={onDynamicUpdate(["readOnly"], 'checked', pageContentData)}
        />
        <div className="flex gap-2 flex-1 flex-wrap">
          {pageContentData["formSource"] !== "url" ? (
            <DropDown
              label={"Form"}
              data={[{ uuid: "", name: "" }, ...context.forms]?.map((form) => {
                return { value: form.uuid, label: form.name };
              })}
              value={pageContentData["form_id"]}
              onChange={onDynamicUpdate(["form_id"], null, pageContentData)}
            />
          ) : (
            <TextInput
              label={"URL"}
              value={pageContentData["url"]}
              onChange={onDynamicUpdate(["url"], null, pageContentData)}
            />
          )}
          <TextInput
            label={"File Id"}
            value={pageContentData["file_id"]}
            onChange={onDynamicUpdate(["file_id"], null, pageContentData)}
          />
        </div>
      </div>
    </PageContentWrapper>
  );
}
