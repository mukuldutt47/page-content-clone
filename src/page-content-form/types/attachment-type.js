import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function AttachmentType({ pageContentData }) {
  const context = useContext(FormContext);
  const { onDynamicUpdate } = context;
  useEffect(() => {
    if (typeof pageContentData?.["content"] !== "string") {
      onDynamicUpdate(
        ["content"],
        null,
        pageContentData
      )({ target: { value: "file" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"Attachment"}>
      <TextInput
        label={"Attachment Route"}
        value={pageContentData?.["content"]}
        onChange={onDynamicUpdate(["content"], null, pageContentData)}
      />
    </PageContentWrapper>
  );
}
