import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function HTMLType({ pageContentData }) {
  const context = useContext(FormContext);
  const { onDynamicUpdate } = context;
  useEffect(() => {
    if (typeof pageContentData["htmlContent"] === "undefined") {
      onDynamicUpdate(["htmlContent"], null, pageContentData)({ target: { value: "" } });
    }
  }, []);
  return (
    <PageContentWrapper label={"HTML Viewer"}>
      <TextInput
        label={"HTML Content"}
        value={pageContentData["htmlContent"]}
        onChange={onDynamicUpdate(["htmlContent"], null, pageContentData)}
      />
    </PageContentWrapper>
  );
}
