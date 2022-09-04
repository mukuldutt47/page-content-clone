import React, { useContext, useEffect } from "react";
import { FormContext } from "../../App";
import { PageContentWrapper } from "../components";
import { TextInput } from "../inputs";

export default function DashboardType({ pageContentData }) {
  const context = useContext(FormContext);
  const { onDynamicUpdate } = context;
  useEffect(() => {
    if (typeof pageContentData?.["uuid"] === "undefined") {
      onDynamicUpdate(["uuid"], null, pageContentData)({ target: { value: "" } });
    }
  }, []);
  console.log(pageContentData)
  return (
    <PageContentWrapper label={"HTML Viewer"}>
      <TextInput
        label={"Dashboard UUID"}
        value={pageContentData?.["uuid"]}
        onChange={onDynamicUpdate(["uuid"], null, pageContentData)}
      />
    </PageContentWrapper>
  );
}
