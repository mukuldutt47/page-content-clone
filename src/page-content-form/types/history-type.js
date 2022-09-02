import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function HistoryType({ pageContentData }) {
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
    if (typeof pageContentData?.["content"] !== "string") {
      update("content", "value")({ target: { value: "{{uuid}}" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"History"}>
      <TextInput label={"Data Source"} disabled={true} value={`{{uuid}}`} />
    </PageContentWrapper>
  );
}
