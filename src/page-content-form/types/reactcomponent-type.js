import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function ReactComponentType({ pageContentData }) {
  const context = useContext(FormContext);
  const { onDynamicUpdate } = context;
  useEffect(() => {
    if (!pageContentData["content"]?.["reactId"]) {
      onDynamicUpdate(
        ["content"],
        null,
        pageContentData
      )({ target: { value: {} } });
    }
  }, []);
  return (
    <PageContentWrapper label={"React Component"}>
      <TextInput
        label={"React Id"}
        value={pageContentData.content?.["reactId"]}
        onChange={onDynamicUpdate(
          ["content", "reactId"],
          null,
          pageContentData
        )}
      />
    </PageContentWrapper>
  );
}
