import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function HistoryType({ pageContentData }) {
  const context = useContext(FormContext);
  const { onDynamicUpdate } = context;
  useEffect(() => {
    if (typeof pageContentData?.["content"] !== "string") {
      onDynamicUpdate(
        ["content"],
        null,
        pageContentData
      )({ target: { value: "{{uuid}}" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"History"}>
      <TextInput label={"Data Source"} disabled={true} value={`{{uuid}}`} />
    </PageContentWrapper>
  );
}
